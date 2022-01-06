import { format } from 'date-fns';
const origin = '';
const reconnectTimeout = 5000;
// @ts-ignore
const messages = await import('./client/i18n/messages');
const debounce = (callback, debounceTime = 300) => {
    let timeout;
    return (event) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(callback, debounceTime, event);
    };
};
const dynMsg = (key) => {
    const message = messages.default[key];
    if (!message) {
        // eslint-disable-next-line no-console
        console.warn(`Dynamic message not found: ${key}`);
        return key;
    }
    return message;
};
const formatDate = (timestamp, formatStr = 'dd.MM.yyyy') => (timestamp ? format(timestamp, formatStr) : '');
const formatDateTime = (timestamp, formatStr = 'dd.MM.yyyy HH:mm') => (timestamp ? format(timestamp, formatStr) : '');
const refreshToken = async () => {
    const response = await window.fetch('/refresh', {
        method: 'post',
    });
    if (response.status !== 200) {
        throw new Error(`${response.status}: ${response.statusText}`);
    }
};
const sendCommand = async (aggregateName, aggregateId, name, data) => {
    let url;
    if (aggregateId) {
        url = `${origin}/command/v2/input/${aggregateName}/${aggregateId}/${name}`;
    }
    else {
        url = `${origin}/command/v2/input/${aggregateName}/${name}`;
    }
    let response = await window.fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (response.status === 401) {
        try {
            await refreshToken();
            response = await window.fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        }
        catch (e) {
            // Router.go('/login');
            window.location.pathname = '/login';
            throw e;
        }
    }
    if (response.status !== 200) {
        throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response.json();
};
const queryView = async (viewName, query = 'all', params) => {
    let url = '';
    if (params) {
        const parameters = Object.keys(params)
            .map((key) => `${key}=${params[key]}`)
            .join('&');
        url = `${origin}/views/v2/${viewName}/value/${query}?${parameters}`;
    }
    else {
        url = `${origin}/views/v2/${viewName}/value/${query}`;
    }
    let response = await window.fetch(url);
    if (response.status === 401) {
        try {
            await refreshToken();
            response = await window.fetch(url);
        }
        catch (e) {
            // Router.go('/login');
            window.location.pathname = '/login';
            throw e;
        }
    }
    if (response.status !== 200) {
        throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response.json();
};
const parseNewlineDelimitedStream = (stream) => {
    if (!stream) {
        throw new Error('Stream is missing.');
    }
    let isCanceled = false;
    let reader;
    return new ReadableStream({
        async start(controller) {
            reader = stream.getReader();
            const decoder = new window.TextDecoder();
            let buffer = '';
            for (;;) {
                const { value, done } = (await reader.read());
                if (done) {
                    if (isCanceled) {
                        return;
                    }
                    buffer = buffer.trim();
                    if (buffer.length > 0) {
                        try {
                            const parsedLine = JSON.parse(buffer);
                            // @ts-ignore
                            const processedLine = process(parsedLine);
                            if (processedLine.name !== 'heartbeat') {
                                controller.enqueue(processedLine);
                            }
                        }
                        catch (ex) {
                            controller.error(ex);
                            return;
                        }
                    }
                    controller.close();
                    return;
                }
                const data = decoder.decode(value, { stream: true });
                buffer += data;
                const lines = buffer.split('\n');
                for (let i = 0; i < lines.length - 1; i += 1) {
                    const line = lines[i].trim();
                    if (line.length > 0) {
                        try {
                            const parsedLine = JSON.parse(line);
                            if (parsedLine.name !== 'heartbeat') {
                                controller.enqueue(parsedLine);
                            }
                        }
                        catch (ex) {
                            isCanceled = true;
                            controller.error(ex);
                            reader.cancel();
                            return;
                        }
                    }
                }
                buffer = lines[lines.length - 1];
            }
        },
        cancel() {
            isCanceled = true;
            return reader.cancel();
        },
    });
};
const observeNotifications = async (store) => {
    try {
        const url = `${origin}/notifications/v2`;
        const response = await window.fetch(url);
        if (response.status !== 200) {
            throw new Error(`Failed to observe notification events. Unexpected status code '${response.status}'.`);
        }
        const reader = parseNewlineDelimitedStream(response.body).getReader();
        for (;;) {
            const { value } = (await reader.read());
            store.dispatch({ type: value.name, payload: value.data });
        }
    }
    catch (ex) {
        // eslint-disable-next-line no-console
        console.info('Try to reconnect notification event stream in 5 seconds.');
        setTimeout(() => observeNotifications(store), reconnectTimeout);
    }
};
export { debounce, dynMsg, formatDate, formatDateTime, observeNotifications, sendCommand, queryView, };
//# sourceMappingURL=base.js.map
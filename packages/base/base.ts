import { EnhancedStore } from '@reduxjs/toolkit';
import { format } from 'date-fns';

const origin = '';
const reconnectTimeout = 5000;

// @ts-ignore
const messages = await import('./client/i18n/messages');

type DebounceCallbackFunction = (event?: Event) => void;

const debounce = (callback: DebounceCallbackFunction, debounceTime = 300) => {
  let timeout: number;

  return (event?: Event) => {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(callback, debounceTime, event);
  };
};

const dynMsg = (key: string): string => {
  const message = messages.default[key];
  if (!message) {
    // eslint-disable-next-line no-console
    console.warn(`Dynamic message not found: ${key}`);
    return key;
  }

  return message;
};

const formatDate = (
  timestamp?: number | Date,
  formatStr = 'dd.MM.yyyy'
): string => (timestamp ? format(timestamp, formatStr) : '');

const formatDateTime = (
  timestamp?: number | Date,
  formatStr = 'dd.MM.yyyy HH:mm'
): string => (timestamp ? format(timestamp, formatStr) : '');

const refreshToken = async (): Promise<void> => {
  const response = await window.fetch('/refresh', {
    method: 'post',
  });

  if (response.status !== 200) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const replay = async (
  flowName: string,
  name: string,
  id: string
): Promise<unknown> => {
  const url = `${origin}/perform-replay/v2`;

  const data = {
    flowNames: [flowName],
    aggregates: [
      {
        aggregateIdentifier: {
          context: {
            name: 'input',
          },
          aggregate: {
            name,
            id,
          },
        },
        from: 1,
        to: 1000,
      },
    ],
  };

  const response = await window.fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.json();
};

const sendCommand = async (
  aggregateName: string,
  aggregateId: string,
  name: string,
  data?: any
): Promise<any> => {
  let url;

  if (aggregateId) {
    url = `${origin}/command/v2/input/${aggregateName}/${aggregateId}/${name}`;
  } else {
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
    } catch (e) {
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

const queryView = async (
  viewName: string,
  query = 'all',
  params?: { [key: string]: string }
): Promise<any | any[]> => {
  let url = '';

  if (params) {
    const parameters = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
    url = `${origin}/views/v2/${viewName}/value/${query}?${parameters}`;
  } else {
    url = `${origin}/views/v2/${viewName}/value/${query}`;
  }

  let response = await window.fetch(url);

  if (response.status === 401) {
    try {
      await refreshToken();

      response = await window.fetch(url);
    } catch (e) {
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

const parseNewlineDelimitedStream = (
  stream: ReadableStream | null
): ReadableStream => {
  if (!stream) {
    throw new Error('Stream is missing.');
  }

  let isCanceled = false;
  let reader: ReadableStreamDefaultReader;

  return new ReadableStream({
    async start(controller) {
      reader = stream.getReader();

      const decoder = new window.TextDecoder();
      let buffer = '';

      for (;;) {
        const { value, done } = (await reader.read()) as {
          value: BufferSource;
          done: boolean;
        };

        if (done) {
          if (isCanceled) {
            return;
          }

          buffer = buffer.trim();

          if (buffer.length > 0) {
            try {
              const parsedLine = JSON.parse(buffer) as {
                [key: string]: unknown;
              };
              // @ts-ignore
              const processedLine = process(parsedLine);

              if (processedLine.name !== 'heartbeat') {
                controller.enqueue(processedLine);
              }
            } catch (ex) {
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
              const parsedLine = JSON.parse(line) as { [key: string]: unknown };

              if (parsedLine.name !== 'heartbeat') {
                controller.enqueue(parsedLine);
              }
            } catch (ex) {
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

const observeNotifications = async (store: EnhancedStore) => {
  try {
    const url = `${origin}/notifications/v2`;
    const response = await window.fetch(url);

    if (response.status !== 200) {
      throw new Error(
        `Failed to observe notification events. Unexpected status code '${response.status}'.`
      );
    }

    const reader = parseNewlineDelimitedStream(response.body).getReader();

    for (;;) {
      const { value } = (await reader.read()) as {
        value: { name: string; data: any };
      };

      store.dispatch({ type: value.name, payload: value.data });
    }
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.info('Try to reconnect notification event stream in 5 seconds.');
    setTimeout(() => observeNotifications(store), reconnectTimeout);
  }
};

export {
  debounce,
  dynMsg,
  formatDate,
  formatDateTime,
  observeNotifications,
  replay,
  sendCommand,
  queryView,
};

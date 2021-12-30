import { format } from 'date-fns';
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
export { debounce, dynMsg, formatDate, formatDateTime };
//# sourceMappingURL=base.js.map
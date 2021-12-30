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
const formatDate = (timestamp) => timestamp ? format(timestamp, 'dd.MM.yyyy') : '';
const formatDateTime = (timestamp) => timestamp ? format(timestamp, 'dd.MM.yyyy HH:mm') : '';
const getDateString = (timestamp, formatStr = 'yyyy-MM-dd') => timestamp ? format(timestamp, formatStr) : format(new Date(), formatStr);
export { debounce, dynMsg, formatDate, formatDateTime, getDateString };
//# sourceMappingURL=base.js.map
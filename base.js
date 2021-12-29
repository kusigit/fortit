import moment from 'moment';
// @ts-ignore
const messages = await import('./client/i18n/messages');
const dynMsg = (key) => {
    const message = messages.default[key];
    if (!message) {
        // eslint-disable-next-line no-console
        console.warn(`Dynamic message not found: ${key}`);
        return key;
    }
    return message;
};
const formatDate = (timestamp) => timestamp ? moment(timestamp).format('DD.MM.YYYY') : '';
const formatDateTime = (timestamp) => moment(timestamp).format('DD.MM.YYYY HH:mm');
const getDateString = (timestamp, format = 'YYYY-MM-DD') => timestamp ? moment(timestamp).format(format) : moment().format(format);
export { dynMsg, formatDate, formatDateTime, getDateString };
//# sourceMappingURL=base.js.map
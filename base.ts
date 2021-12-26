import moment from 'moment';

// @ts-ignore
const dynMessages = import('./client/i18n/messages');

const dynMsg = (key: string): string => {
  const message = dynMessages[key];
  if (!message) {
    // eslint-disable-next-line no-console
    console.warn(`Dynamic message not found: ${key}`);
    return key;
  }

  return message;
};

const formatDate = (timestamp?: number): string =>
  timestamp ? moment(timestamp).format('DD.MM.YYYY') : '';

export { dynMsg, formatDate };

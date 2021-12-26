import moment from 'moment';

const dynMsg = async (key: string): Promise<string> => {
  // @ts-ignore
  const dynMessages = await import('./client/i18n/messages');

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

import { format } from 'date-fns';

// @ts-ignore
const messages = await import('./client/i18n/messages');

type DebounceCallbackFunction = (event?: Event) => void;

const debounce = (callback: DebounceCallbackFunction, debounceTime = 300) => {
  let timeout: number;

  return (event: Event) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(callback, debounceTime, event);
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

const formatDate = (timestamp?: number): string =>
  timestamp ? format(timestamp, 'dd.MM.yyyy') : '';

const formatDateTime = (timestamp: number): string =>
  timestamp ? format(timestamp, 'dd.MM.yyyy HH:mm') : '';

const getDateString = (timestamp?: number, formatStr = 'yyyy-MM-dd'): string =>
  timestamp ? format(timestamp, formatStr) : format(new Date(), formatStr);

export { debounce, dynMsg, formatDate, formatDateTime, getDateString };

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

const formatDate = (
  timestamp?: number | Date,
  formatStr = 'dd.MM.yyyy'
): string => (timestamp ? format(timestamp, formatStr) : '');

const formatDateTime = (
  timestamp?: number | Date,
  formatStr = 'dd.MM.yyyy HH:mm'
): string => (timestamp ? format(timestamp, formatStr) : '');

export { debounce, dynMsg, formatDate, formatDateTime };

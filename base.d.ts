declare type DebounceCallbackFunction = (event?: Event) => void;
declare const debounce: (callback: DebounceCallbackFunction, debounceTime?: number) => (event: Event) => void;
declare const dynMsg: (key: string) => string;
declare const formatDate: (timestamp?: number | undefined) => string;
declare const formatDateTime: (timestamp: number) => string;
declare const getDateString: (timestamp?: number | undefined, format?: string) => string;
export { debounce, dynMsg, formatDate, formatDateTime, getDateString };

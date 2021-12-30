declare type DebounceCallbackFunction = (event?: Event) => void;
declare const debounce: (callback: DebounceCallbackFunction, debounceTime?: number) => (event: Event) => void;
declare const dynMsg: (key: string) => string;
declare const formatDate: (timestamp?: number | Date | undefined, formatStr?: string) => string;
declare const formatDateTime: (timestamp?: number | Date | undefined, formatStr?: string) => string;
export { debounce, dynMsg, formatDate, formatDateTime };

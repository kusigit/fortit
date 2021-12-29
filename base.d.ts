declare const dynMsg: (key: string) => string;
declare const formatDate: (timestamp?: number | undefined) => string;
declare const formatDateTime: (timestamp: number) => string;
declare const getDateString: (timestamp?: number | undefined, format?: string) => string;
export { dynMsg, formatDate, formatDateTime, getDateString };

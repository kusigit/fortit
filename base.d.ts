declare const dynMsg: (key: string) => Promise<string>;
declare const formatDate: (timestamp?: number | undefined) => string;
export { dynMsg, formatDate };

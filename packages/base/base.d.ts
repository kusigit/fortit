import { EnhancedStore } from '@reduxjs/toolkit';
declare type DebounceCallbackFunction = (event?: Event) => void;
declare const debounce: (callback: DebounceCallbackFunction, debounceTime?: number) => (event: Event) => void;
declare const dynMsg: (key: string) => string;
declare const formatDate: (timestamp?: number | Date | undefined, formatStr?: string) => string;
declare const formatDateTime: (timestamp?: number | Date | undefined, formatStr?: string) => string;
declare const replay: (flowName: string, name: string, id: string) => Promise<unknown>;
declare const sendCommand: (aggregateName: string, aggregateId: string, name: string, data?: any) => Promise<any>;
declare const queryView: (viewName: string, query?: string, params?: {
    [key: string]: string;
} | undefined) => Promise<any | any[]>;
declare const observeNotifications: (store: EnhancedStore) => Promise<void>;
export { debounce, dynMsg, formatDate, formatDateTime, observeNotifications, replay, sendCommand, queryView, };

import { LitElement } from 'lit';
import '@material/mwc-icon-button';
export declare class DataTable extends LitElement {
    static styles: import("lit").CSSResult[];
    mode: string;
    allDatas: any[];
    datas: any[];
    filter: {
        [field: string]: string;
    };
    order: {
        [field: string]: string;
    };
    protected setData<T>(datas: T[]): void;
    protected sort(field: string): void;
    protected setFilter(field?: string, value?: string): void;
}

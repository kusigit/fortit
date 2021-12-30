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
    setData<T>(datas: T[], id?: string): void;
    sort(field: string): void;
    setFilter(field?: string, value?: string): void;
}

import { TemplateResult, LitElement } from 'lit';
import '@material/mwc-icon-button';
export declare class DataTable extends LitElement {
    static styles: import("lit").CSSResult;
    actions: any[];
    columns: string[];
    items: any[];
    allItems: any[];
    filter: {
        [field: string]: string;
    };
    order: {
        [field: string]: string;
    };
    protected render(): TemplateResult;
    private setFilter;
    private sort;
}
declare global {
    interface HTMLElementTagNameMap {
        'fwc-data-table': DataTable;
    }
}

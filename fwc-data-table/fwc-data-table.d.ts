import { TemplateResult, LitElement } from 'lit';
export declare class FwcDataTable extends LitElement {
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
        'fwc-data-table': FwcDataTable;
    }
}

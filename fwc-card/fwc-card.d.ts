import { TemplateResult, LitElement } from 'lit';
export declare class FwcCard extends LitElement {
    static styles: import("lit").CSSResult;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "fwc-card": FwcCard;
    }
}

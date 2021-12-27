import { TemplateResult, LitElement } from 'lit';
export declare class FwcCard extends LitElement {
    static styles: import("lit").CSSResult;
    padded: boolean;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'fwc-card': FwcCard;
    }
}

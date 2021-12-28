import { TemplateResult, LitElement } from 'lit';
export declare class FwcChip extends LitElement {
    static styles: import("lit").CSSResult;
    action: boolean;
    icon: string;
    id: string;
    text: string;
    protected render(): TemplateResult;
    private dispatch;
}
declare global {
    interface HTMLElementTagNameMap {
        'fwc-chip': FwcChip;
    }
}

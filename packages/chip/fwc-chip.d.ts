import { TemplateResult, LitElement } from 'lit';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
export declare class Chip extends LitElement {
    static styles: import("lit").CSSResult;
    action: boolean;
    icon: string;
    text: string;
    protected render(): TemplateResult;
    private dispatch;
}
declare global {
    interface HTMLElementTagNameMap {
        'fwc-chip': Chip;
    }
}

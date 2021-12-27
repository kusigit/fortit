import { TemplateResult, LitElement } from 'lit';
import '@material/mwc-icon-button';
export declare class FwcMain extends LitElement {
    static styles: import("lit").CSSResult;
    backUrl: string;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'fwc-main': FwcMain;
    }
}

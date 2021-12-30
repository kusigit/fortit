import { TemplateResult, LitElement } from 'lit';
import '@material/mwc-icon-button';
export declare class Main extends LitElement {
    static styles: import("lit").CSSResult;
    back: boolean;
    backUrl: string;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'fwc-main': Main;
    }
}

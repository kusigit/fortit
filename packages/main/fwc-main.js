import { __decorate } from "tslib";
import { html, css, LitElement, nothing } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { msg } from '@lit/localize';
import '@material/mwc-icon-button';
let Main = class Main extends LitElement {
    constructor() {
        super(...arguments);
        this.back = false;
        this.backUrl = '';
    }
    render() {
        return html `
      <div class="subheader">
        ${this.back
            ? html `
              <mwc-icon-button
                icon="chevron_left"
                title="${msg(`Zurück`)}"
                @click="${() => window.history.back()}"
              ></mwc-icon-button>
            `
            : nothing}
        ${this.backUrl
            ? html `
              <a href="${this.backUrl}" title="${msg(`Zurück`)}">
                <mwc-icon-button icon="chevron_left"></mwc-icon-button>
              </a>
            `
            : nothing}
        <slot name="title"></slot>
        <slot name="secondary"></slot>
        <slot name="primary"></slot>
      </div>
      <slot name="content"></slot>
    `;
    }
};
Main.styles = css `
    :host {
      display: block;
      margin: 0 auto;
      padding: var(--fwc-main-padding, 24px);
      max-width: var(--fwc-main-max-width, 1600px);
    }

    slot {
      display: block;
    }

    slot[name='title'] {
      flex-grow: 1;
    }

    slot[name='content'] {
      margin-top: var(--fwc-main-margin, 24px);
    }

    slot[name='secondary'] {
      margin-right: var(--fwc-main-margin, 24px);
    }

    a {
      color: black;
    }

    .subheader {
      display: flex;
      min-height: 48px;
      justify-content: space-between;
      align-items: center;
    }
  `;
__decorate([
    property({ type: Boolean })
], Main.prototype, "back", void 0);
__decorate([
    property({ type: String })
], Main.prototype, "backUrl", void 0);
Main = __decorate([
    customElement('fwc-main')
], Main);
export { Main };
//# sourceMappingURL=fwc-main.js.map
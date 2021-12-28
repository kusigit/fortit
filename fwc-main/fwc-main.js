import { __decorate } from "tslib";
import { html, css, LitElement, nothing } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { msg } from '@lit/localize';
import '@material/mwc-icon-button';
let FwcMain = class FwcMain extends LitElement {
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
FwcMain.styles = css `
    :host {
      display: block;
      margin: 0 auto;
      padding: var(--padding-medium);
      max-width: var(--fwc-max-width, 1600px);
    }

    slot {
      display: block;
    }

    slot[name='title'] {
      flex-grow: 1;
    }

    slot[name='content'] {
      margin-top: var(--padding-medium);
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
], FwcMain.prototype, "back", void 0);
__decorate([
    property({ type: String })
], FwcMain.prototype, "backUrl", void 0);
FwcMain = __decorate([
    customElement('fwc-main')
], FwcMain);
export { FwcMain };
//# sourceMappingURL=fwc-main.js.map
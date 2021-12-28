import { __decorate } from "tslib";
import { msg } from '@lit/localize';
import { html, css, LitElement, nothing } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
let FwcChip = class FwcChip extends LitElement {
    constructor() {
        super(...arguments);
        this.action = false;
        this.icon = '';
        this.text = '';
    }
    render() {
        return html `
      <mwc-icon>${this.icon}</mwc-icon>
      <span class="text">${this.text}</span>
      ${this.action
            ? html ` <mwc-icon-button
            icon="cancel"
            title="${msg(`Entfernen`)}"
            @click="${this.dispatch}"
          ></mwc-icon-button>`
            : nothing}
    `;
    }
    dispatch(event) {
        event.stopPropagation();
        this.dispatchEvent(new CustomEvent('remove'));
    }
};
FwcChip.styles = css `
    :host {
      display: flex;
      max-width: var(--fwc-chip-max-width, 160px);
      border-radius: 16px;
      padding: 4px 6px 4px 8px;
      align-items: center;
      background-color: #232f341f;
    }

    mwc-icon {
      --mdc-icon-size: 20px;
    }

    mwc-icon-button {
      display: flex;
    }

    mwc-icon-button[icon='cancel'] {
      --mdc-icon-size: 18px;
      --mdc-icon-button-size: 18px;
    }

    .text {
      font-size: 12px;
      margin: 0 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;
__decorate([
    property({ type: Boolean })
], FwcChip.prototype, "action", void 0);
__decorate([
    property({ type: String })
], FwcChip.prototype, "icon", void 0);
__decorate([
    property({ type: String })
], FwcChip.prototype, "text", void 0);
FwcChip = __decorate([
    customElement('fwc-chip')
], FwcChip);
export { FwcChip };
//# sourceMappingURL=fwc-chip.js.map
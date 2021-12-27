import { __decorate } from "tslib";
import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
let FwcCard = class FwcCard extends LitElement {
    constructor() {
        super(...arguments);
        this.padded = false;
    }
    render() {
        return html `
      <div class="${this.padded ? 'padded' : ''}">
        <slot name="header"></slot>
        <slot></slot>
        <slot name="action"></slot>
      </div>
    `;
    }
};
FwcCard.styles = css `
    :host {
      display: block;
      overflow: hidden;
      width: 100%;
      box-sizing: border-box;
      background-color: white;
      border-radius: var(--fwc-border-radius, 4px);
      box-shadow: var(--box-shadow);
      overflow: visible;
      --padding-small: var(--fwc-padding-small, 16px);
      --padding-medium: var(--fwc-padding-medium, 24px);
    }

    slot {
      display: block;
    }

    .padded {
      padding: var(--padding-medium);
    }

    slot[name='header'] {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `;
__decorate([
    property({ type: Boolean })
], FwcCard.prototype, "padded", void 0);
FwcCard = __decorate([
    customElement('fwc-card')
], FwcCard);
export { FwcCard };
//# sourceMappingURL=fwc-card.js.map
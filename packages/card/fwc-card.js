import { __decorate } from "tslib";
import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
let Card = class Card extends LitElement {
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
Card.styles = css `
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
], Card.prototype, "padded", void 0);
Card = __decorate([
    customElement('fwc-card')
], Card);
export { Card };
//# sourceMappingURL=fwc-card.js.map
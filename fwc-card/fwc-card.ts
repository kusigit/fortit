import { TemplateResult, html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

@customElement('fwc-card')
export class FwcCard extends LitElement {
  static styles = css`
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

  @property({ type: Boolean })
  padded = false;

  protected render(): TemplateResult {
    return html`
      <div class="${this.padded ? 'padded' : ''}">
        <slot name="header"></slot>
        <slot></slot>
        <slot name="action"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fwc-card': FwcCard;
  }
}

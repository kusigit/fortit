import { msg } from '@lit/localize';
import { TemplateResult, html, css, LitElement, nothing } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

@customElement('fwc-chip')
export class FwcChip extends LitElement {
  static styles = css`
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

  @property({ type: Boolean })
  action = false;

  @property({ type: String })
  icon = '';

  @property({ type: String })
  text = '';

  protected render(): TemplateResult {
    return html`
      <mwc-icon>${this.icon}</mwc-icon>
      <span class="text">${this.text}</span>
      ${this.action
        ? html` <mwc-icon-button
            icon="cancel"
            title="${msg(`Entfernen`)}"
            @click="${this.dispatch}"
          ></mwc-icon-button>`
        : nothing}
    `;
  }

  private dispatch(event: Event) {
    event.stopPropagation();

    const customEvent = new CustomEvent('remove', {
      detail: {
        id: this.id,
      },
    });

    this.dispatchEvent(customEvent);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fwc-chip': FwcChip;
  }
}

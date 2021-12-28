import { TemplateResult, html, css, LitElement, nothing } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { msg } from '@lit/localize';

import '@material/mwc-icon-button';

@customElement('fwc-main')
export class FwcMain extends LitElement {
  static styles = css`
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

  @property({ type: Boolean })
  back = false;

  @property({ type: String })
  backUrl = '';

  protected render(): TemplateResult {
    return html`
      <div class="subheader">
        ${this.back
          ? html`
              <mwc-icon-button
                icon="chevron_left"
                title="${msg(`Zurück`)}"
                @click="${() => window.history.back()}"
              ></mwc-icon-button>
            `
          : nothing}
        ${this.backUrl
          ? html`
              <a href="${this.backUrl}" title="${msg(`Zurück`)}">
                <mwc-icon-button icon="chevron_left"></mwc-icon-button>
              </a>
            `
          : nothing}
        <slot name="title"></slot>
        <slot name="primary"></slot>
      </div>
      <slot name="content"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fwc-main': FwcMain;
  }
}

import {TemplateResult, html, css, LitElement} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';

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

    slot[name='header'] {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px var(--padding-medium);
    }

    slot[name='content'] {
      display: block;
      padding: 0 var(--padding-medium) 0 var(--padding-medium);
    }

    .card-action {
      display: flex;
      align-items: center;
      padding: 0px var(--padding-small);
      height: 56px;
    }
  `;

  protected render(): TemplateResult {
    return html`
      <slot name="header"></slot>
      <slot name="content"></slot>
    `;
  }
}

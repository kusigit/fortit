import { TemplateResult, html, css, LitElement } from 'lit';
import { msg } from '@lit/localize';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { state } from 'lit/decorators/state.js';
import { Menu } from '@material/mwc-menu';

import '@material/mwc-list/mwc-list-item';
import '@material/mwc-menu';
import '@fortit/fwc-chip';

@customElement('fwc-chip-list')
export class ChipList extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        width: 100%;
        --input-width: 160px;
        --mdc-menu-min-width: 100%;
      }

      .container {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 5px 0 4px 0;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: rgba(0, 0, 0, 0.12);
      }

      .container:hover {
        border-bottom-color: var(--mdc-theme-primary);
      }

      .input {
        border: none;
        outline: none;
        padding: 7px 0;
        width: var(--input-width);
      }

      mwc-menu {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -1px;
      }

      .chip {
        display: flex;
        max-width: var(--chip-max-width, 160px);
        border-radius: 16px;
        padding: 4px 6px 4px 8px;
        align-items: center;
        background-color: #232f341f;
      }

      .chip mwc-icon {
        --mdc-icon-size: 20px;
      }

      .chip mwc-icon-button {
        display: flex;
      }

      .chip mwc-icon-button[icon='cancel'] {
        --mdc-icon-size: 18px;
        --mdc-icon-button-size: 18px;
      }

      .chip-list {
        display: grid;
        align-items: center;
        grid-template-columns: 24px auto 112px;
        grid-template-areas:
          'arrow-up chips-up action-up'
          'horizontal horizontal horizontal'
          'arrow-down chips-down action-down';
        grid-gap: 0 var(--padding-small);
      }

      .action-up {
        grid-area: action-up;
      }

      .action-down {
        grid-area: action-down;
      }

      .arrow-up {
        width: 24px;
        height: 24px;
        transform: rotate(-90deg);
        grid-area: arrow-up;
      }

      .arrow-down {
        width: 24px;
        height: 24px;
        transform: rotate(90deg);
        grid-area: arrow-down;
      }

      .chips-up {
        display: flex;
        align-items: center;
        flex-flow: wrap;
        gap: 8px;
        grid-area: chips-up;
      }

      .chips-down {
        display: flex;
        flex-flow: wrap;
        gap: 8px;
        grid-area: chips-down;
      }

      .horizontal {
        grid-area: horizontal;
      }

      .chip-text {
        font-size: 12px;
        margin: 0 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `,
  ];

  @query('mwc-menu')
  menu!: Menu;

  @query('.input')
  input!: HTMLInputElement;

  @property({ type: String })
  icon = '';

  @property({ type: Array })
  all: any[] = [];

  @state()
  additional: any[] = [];

  @state()
  selectedSet = new Set<any>();

  initialSet = new Set<any>();

  addedSet = new Set<any>();

  removedSet = new Set<any>();

  get added() {
    return Array.from(this.addedSet);
  }

  get removed() {
    return Array.from(this.removedSet);
  }

  get selected() {
    return Array.from(this.selectedSet);
  }

  set selected(value: any[]) {
    this.addedSet = new Set<any>();
    this.removedSet = new Set<any>();
    this.initialSet = new Set(value);
    this.selectedSet = new Set(value);
  }

  protected render(): TemplateResult {
    return html`
      <div class="container">
        ${this.getSelectedItems()}
        <input
          type="text"
          class="input"
          placeholder="${msg(`Hinzufügen...`)}"
          ?hidden="${this.all.length === this.selectedSet.size}"
          @blur="${this.clearInput}"
          @focus="${this.showMenu}"
          @input="${this.changeInput}"
        />
        ${this.getAdditionalItems()}
      </div>
    `;
  }

  private getSelectedItems(): TemplateResult {
    return html`${Array.from(this.selectedSet).map(
      (item: any) =>
        html` <fwc-chip
            icon="${this.icon}"
            text="${item.name}"
            @remove="${() => this.delete(item)}"
            action
          ></fwc-chip>`
    )}`;
  }

  private getAdditionalItems(): TemplateResult {
    this.additional = this.filteredItems();

    return html`<mwc-menu
      defaultFocus="NONE"
      ?hidden="${this.additional.length === 0 ||
      this.all.length === this.selectedSet.size}"
      @action="${this.add}"
      >${this.additional.map(
        (item: any) =>
          html`<mwc-list-item>
            <span>${item.name}</span>
          </mwc-list-item>`
      )}
    </mwc-menu>`;
  }

  private clearInput() {
    this.input.value = '';
  }

  private changeInput() {
    this.menu.show();
    this.requestUpdate();
  }

  private showMenu() {
    setTimeout(() => {
      this.menu.show();
    }, 100);
  }

  private filteredItems() {
    return this.all
      .filter((item) => !this.selectedSet.has(item))
      .filter(
        (item) =>
          item.name.search(new RegExp(`${this.input?.value || ''}.*`, 'i')) !==
          -1
      );
  }

  private add(event: CustomEvent) {
    const item = this.additional[event.detail.index];

    if (this.initialSet.has(item)) {
      this.removedSet.delete(item);
    } else {
      this.addedSet.add(item);
    }

    this.selectedSet.add(item);
    this.input.value = '';

    this.requestUpdate();
  }

  private delete(item: any) {
    if (this.addedSet.has(item)) {
      this.addedSet.delete(item);
    } else {
      this.removedSet.add(item);
    }

    this.selectedSet.delete(item);
    this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fwc-chip-list': ChipList;
  }
}

import { __decorate } from "tslib";
import { html, css, LitElement } from 'lit';
import { msg, localized } from '@lit/localize';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { state } from 'lit/decorators/state.js';
import '@material/mwc-icon';
import '@material/mwc-menu/mwc-menu';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon-button/mwc-icon-button';
let FwcChipList = class FwcChipList extends LitElement {
    constructor() {
        super(...arguments);
        this.icon = '';
        this.all = [];
        this.additional = [];
        this.selectedSet = new Set();
        this.initialSet = new Set();
        this.addedSet = new Set();
        this.removedSet = new Set();
    }
    get added() {
        return Array.from(this.addedSet);
    }
    get removed() {
        return Array.from(this.removedSet);
    }
    get selected() {
        return Array.from(this.selectedSet);
    }
    set selected(value) {
        this.addedSet = new Set();
        this.removedSet = new Set();
        this.initialSet = new Set(value);
        this.selectedSet = new Set(value);
    }
    render() {
        return html `
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
    getSelectedItems() {
        return html `${Array.from(this.selectedSet).map((item) => html ` <span class="chip">
          <mwc-icon>${this.icon}</mwc-icon>
          <span class="chip-text" title="${item.name}">${item.name}</span>
          <mwc-icon-button
            icon="cancel"
            title="${msg(`Entfernen`)}"
            @click="${() => this.delete(item)}"
          ></mwc-icon-button>
        </span>`)}`;
    }
    getAdditionalItems() {
        this.additional = this.filteredItems();
        return html `<mwc-menu
      defaultFocus="NONE"
      ?hidden="${this.additional.length === 0 ||
            this.all.length === this.selectedSet.size}"
      @action="${this.add}"
      >${this.additional.map((item) => html `<mwc-list-item>
            <span>${item.name}</span>
          </mwc-list-item>`)}
    </mwc-menu>`;
    }
    clearInput() {
        this.input.value = '';
    }
    changeInput() {
        this.menu.show();
        this.requestUpdate();
    }
    showMenu() {
        setTimeout(() => {
            this.menu.show();
        }, 100);
    }
    filteredItems() {
        return this.all
            .filter((item) => !this.selectedSet.has(item))
            .filter((item) => {
            var _a;
            return item.name.search(new RegExp(`${((_a = this.input) === null || _a === void 0 ? void 0 : _a.value) || ''}.*`, 'i')) !==
                -1;
        });
    }
    add(event) {
        const item = this.additional[event.detail.index];
        if (this.initialSet.has(item)) {
            this.removedSet.delete(item);
        }
        else {
            this.addedSet.add(item);
        }
        this.selectedSet.add(item);
        this.input.value = '';
        this.requestUpdate();
    }
    delete(item) {
        if (this.addedSet.has(item)) {
            this.addedSet.delete(item);
        }
        else {
            this.removedSet.add(item);
        }
        this.selectedSet.delete(item);
        this.requestUpdate();
    }
};
FwcChipList.styles = [
    css `
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
__decorate([
    query('mwc-menu')
], FwcChipList.prototype, "menu", void 0);
__decorate([
    query('.input')
], FwcChipList.prototype, "input", void 0);
__decorate([
    property({ type: String })
], FwcChipList.prototype, "icon", void 0);
__decorate([
    property({ type: Array })
], FwcChipList.prototype, "all", void 0);
__decorate([
    state()
], FwcChipList.prototype, "additional", void 0);
__decorate([
    state()
], FwcChipList.prototype, "selectedSet", void 0);
FwcChipList = __decorate([
    localized(),
    customElement('fwc-chip-list')
], FwcChipList);
export { FwcChipList };
//# sourceMappingURL=fwc-chip-list.js.map
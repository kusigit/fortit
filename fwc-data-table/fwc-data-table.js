import { __decorate } from "tslib";
import { msg } from '@lit/localize';
import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { formatDate, dynMsg } from '..';
let FwcDataTable = class FwcDataTable extends LitElement {
    constructor() {
        super(...arguments);
        this.actions = [];
        this.columns = [];
        this.items = [];
        this.allItems = [];
        this.filter = {};
        this.order = {
            name: 'asc',
        };
    }
    render() {
        return html `
      <table class="data-table">
        <thead>
          <tr>
            ${this.columns.map((column) => html `
                <th>
                  <span class="header">
                    <span class="title">${dynMsg(column)}</span>
                    <mwc-icon-button
                      class="${this.order[column]}"
                      icon="arrow_forward"
                      @click="${() => this.sort(column)}"
                    ></mwc-icon-button>
                  </span>
                </th>
              `)}
          </tr>
          <tr>
            ${this.columns.map((column) => html `
                <th>
                  <input
                    type="text"
                    placeholder="${msg(`Filter...`)}"
                    @input="${(event) => {
            this.setFilter(column, event.target.value);
        }}"
                  />
                </th>
              `)}
          </tr>
        </thead>
        <tbody>
          ${this.items.map((item) => html `
              <tr class="${item.checked ? 'selected' : ''}">
                ${this.columns.map((column) => html `
                    <td class="ellipsis" title="${item[column]}">
                      ${item[column]}
                    </td>
                  `)}
                <td class="wide">
                  ${this.actions.map((action) => html `
                      <mwc-icon-button
                        icon="${action.icon}"
                        title="${action.title}"
                        @click="${() => action.click(item.id)}"
                      ></mwc-icon-button>
                    `)}
                </td>
              </tr>
            `)}
        </tbody>
      </table>
    `;
    }
    setFilter(field = '', value = '') {
        if (value === '') {
            delete this.filter[field];
        }
        else {
            this.filter[field] = value;
        }
        if (this.allItems.length === 0) {
            this.allItems = this.items;
        }
        this.items = this.allItems.filter((item) => Object.entries(this.filter).every(([key, search]) => {
            let val = item[key];
            switch (key) {
                case 'state':
                    val = dynMsg(item[key]);
                    break;
                case 'changed_at':
                case 'created_at':
                case 'date':
                case 'last_assessment':
                    val = formatDate(item[key]);
                    break;
                default:
                    break;
            }
            const regEx = new RegExp(search, 'i');
            return regEx.test(val);
        }));
    }
    sort(field) {
        Object.keys(this.order).forEach((f) => {
            if (f !== field) {
                delete this.order[f];
            }
        });
        this.order[field] = this.order[field] === 'asc' ? 'desc' : 'asc';
        const items = [...this.items];
        items.sort((a, b) => {
            if (this.order[field] === 'asc') {
                // @ts-ignore
                return a[field] > b[field] ? 1 : -1;
            }
            // @ts-ignore
            return a[field] < b[field] ? 1 : -1;
        });
        this.items = items;
    }
};
FwcDataTable.styles = css `
    .data-table {
      width: 100%;
      border-spacing: 0px;
      border-collapse: collapse;
      table-layout: fixed;
      --mdc-icon-button-size: 32px;
    }

    .data-table th {
      font-size: 12px;
      font-weight: 500;
      height: 56px;
      line-height: 56px;
      padding: 0 var(--padding-medium) 0 0;
      text-align: left;
    }

    .data-table.narrow th:not(.wide),
    .data-table.narrow td:not(.wide) {
      padding-right: 0;
    }

    .data-table:not(.narrow) th:nth-last-child(1) {
      width: 70px;
    }

    .data-table th .header {
      display: flex;
      align-items: center;
      white-space: nowrap;
    }

    .data-table th .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 8px;
    }

    .data-table th mwc-icon-button {
      height: 24px;
      vertical-align: middle;
      visibility: hidden;
      transform: rotate(90deg);
      --mdc-icon-button-size: 24px;
    }

    .data-table th:hover mwc-icon-button {
      color: gray;
      display: inline-block;
      visibility: visible;
    }

    .data-table th mwc-icon-button.asc {
      visibility: visible;
      transform: rotate(90deg);
    }

    .data-table th mwc-icon-button.desc {
      visibility: visible;
      transform: rotate(-90deg);
    }

    .data-table thead .action {
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }

    .data-table.wide th:last-child {
      padding-right: var(--padding-medium);
    }

    .data-table.wide td:last-child {
      padding-right: 0;
    }

    .data-table tbody td {
      font-size: 13px;
      height: 51px;
      white-space: nowrap;
      padding: 0 var(--padding-medium) 0 0;
      border-top: 1px solid rgba(0, 0, 0, 0.12);
    }

    .data-table th.right,
    .data-table td.right {
      text-align: right;
      padding-right: 16px;
    }

    .data-table tbody td mwc-checkbox {
      margin-left: -15px;
    }

    .data-table thead .filter th {
      height: 51px;
      border-top: 1px solid rgba(0, 0, 0, 0.12);
    }

    .data-table input[type='text'] {
      outline: none;
      width: 100%;
      padding: 4px 0;
      border-color: rgba(0, 0, 0, 0.38);
      border-width: 0 0 1px 0;
      background-color: transparent;
    }

    .data-table input[type='text']:hover {
      border-color: black;
    }

    .data-table input[type='text']:focus {
      border-color: var(--mdc-theme-primary);
    }

    :host-context([mode='modal']) .data-table .filter,
    :host-context([mode='modal']) .data-table .wide,
    :host-context([mode='modal']) .data-table .actions {
      display: none;
    }

    .ellipsis {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .action-row {
      display: flex;
      align-items: center;
    }

    .action-row mwc-button {
      margin-left: -8px;
    }

    .selection {
      flex-grow: 1;
      padding-left: var(--padding-medium);
    }

    .data-table tr.remove {
      border-bottom-color: rgba(var(--mdc-theme-secondary-rgb), 0.5);
      background-color: rgba(var(--mdc-theme-secondary-rgb), 0.5);
    }

    @media screen {
      .data-table tbody tr:hover,
      .data-table tbody tr.selected:hover {
        background-color: var(--material-color-grey-200);
      }

      .data-table tbody tr.selected {
        background-color: var(--material-color-grey-100);
      }

      .data-table tbody tr.error {
        background-color: var(--paper-red-50);
      }
    }
  `;
__decorate([
    property({ type: Array })
], FwcDataTable.prototype, "actions", void 0);
__decorate([
    property({ type: Array })
], FwcDataTable.prototype, "columns", void 0);
__decorate([
    property({ type: Array })
], FwcDataTable.prototype, "items", void 0);
__decorate([
    state()
], FwcDataTable.prototype, "allItems", void 0);
__decorate([
    state()
], FwcDataTable.prototype, "filter", void 0);
__decorate([
    state()
], FwcDataTable.prototype, "order", void 0);
FwcDataTable = __decorate([
    customElement('fwc-data-table')
], FwcDataTable);
export { FwcDataTable };
//# sourceMappingURL=fwc-data-table.js.map
import { __decorate } from "tslib";
import { css, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { dynMsg, formatDate } from '../base/base.js';
import '@material/mwc-icon-button';
export class DataTable extends LitElement {
    constructor() {
        super(...arguments);
        this.mode = '';
        this.allDatas = [];
        this.datas = [];
        this.filter = {};
        this.order = {
            name: 'asc',
        };
    }
    setData(datas) {
        this.datas = datas;
        this.allDatas = datas;
    }
    sort(field) {
        Object.keys(this.order).forEach((f) => {
            if (f !== field) {
                delete this.order[f];
            }
        });
        this.order[field] = this.order[field] === 'asc' ? 'desc' : 'asc';
        const datas = [...this.datas];
        datas.sort((a, b) => {
            if (this.order[field] === 'asc') {
                // @ts-ignore
                return a[field] > b[field] ? 1 : -1;
            }
            // @ts-ignore
            return a[field] < b[field] ? 1 : -1;
        });
        this.datas = datas;
    }
    setFilter(field = '', value = '') {
        if (value === '') {
            delete this.filter[field];
        }
        else {
            this.filter[field] = value;
        }
        this.datas = this.allDatas.filter((item) => Object.entries(this.filter).every(([key, search]) => {
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
}
DataTable.styles = [
    css `
      :host {
        display: block;
      }

      table {
        position: relative;
        table-layout: fixed;
        width: 100%;
        border-spacing: 0px;
        border-collapse: collapse;
        --mdc-icon-button-size: 32px;
      }

      table th {
        font-size: 12px;
        font-weight: 500;
        height: 56px;
        line-height: 56px;
        padding: 0 var(--padding-small) 0 var(--padding-small);
        text-align: left;
      }

      :host-context([mode='modal']) table th,
      :host-context([mode='modal']) table td {
        padding: 0 var(--padding-small) 0 0;
      }

      :host-context([mode='modal']) table th:not(.wide),
      :host-context([mode='modal']) table td:not(.wide) {
        padding-right: 0;
      }

      table .actions {
        position: absolute;
        left: 0;
        right: 0;
        padding: 9.5px var(--padding-small);
        margin-top: -51px;
        opacity: 0;
        text-align: right;
        background: linear-gradient(
          -90deg,
          var(--material-color-grey-100) 230px,
          rgba(0, 0, 0, 0.04) 230px
        );
      }

      table .actions:hover,
      table tr:hover + .actions {
        opacity: 1;
      }

      table th .header {
        display: flex;
        align-items: center;
        white-space: nowrap;
      }

      table th .title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 8px;
      }

      table th mwc-icon-button {
        height: 24px;
        vertical-align: middle;
        visibility: hidden;
        transform: rotate(90deg);
        --mdc-icon-button-size: 24px;
      }

      table th:hover mwc-icon-button {
        color: gray;
        display: inline-block;
        visibility: visible;
      }

      table th mwc-icon-button.asc {
        visibility: visible;
        transform: rotate(90deg);
      }

      table th mwc-icon-button.desc {
        visibility: visible;
        transform: rotate(-90deg);
      }

      table thead .action {
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      }

      table.wide th:last-child {
        padding-right: var(--padding-medium);
      }

      table.wide td:last-child {
        padding-right: 0;
      }

      table tbody td {
        font-size: 13px;
        height: 51px;
        white-space: nowrap;
        padding: 0 var(--padding-small) 0 var(--padding-small);
        border-top: 1px solid rgba(0, 0, 0, 0.12);
      }

      table th.right,
      table td.right {
        text-align: right;
        padding-right: 16px;
      }

      table tbody td mwc-checkbox {
        margin-left: -15px;
      }

      table thead .filter th {
        height: 51px;
        border-top: 1px solid rgba(0, 0, 0, 0.12);
      }

      table input[type='text'] {
        outline: none;
        width: 100%;
        padding: 4px 0;
        border-color: rgba(0, 0, 0, 0.38);
        border-width: 0 0 1px 0;
        background-color: transparent;
      }

      table input[type='text']:hover {
        border-color: black;
      }

      table input[type='text']:focus {
        border-color: var(--mdc-theme-primary);
      }

      :host-context([mode='modal']) table .filter,
      :host-context([mode='modal']) table .wide,
      :host-context([mode='modal']) table .actions {
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

      .selection {
        flex-grow: 1;
        padding-left: var(--padding-medium);
      }

      table tr.remove {
        border-bottom-color: rgba(var(--mdc-theme-secondary-rgb), 0.5);
        background-color: rgba(var(--mdc-theme-secondary-rgb), 0.5);
      }

      table tbody td.level-1 {
        padding-left: 40px;
      }

      table tbody td.level-2 {
        padding-left: 64px;
      }

      table tbody td.level-3 {
        padding-left: 88px;
      }

      table tbody td.level-4 {
        padding-left: 112px;
      }

      @media screen {
        table tbody tr.error {
          background-color: var(--paper-red-50);
        }
      }
    `,
];
__decorate([
    property()
], DataTable.prototype, "mode", void 0);
__decorate([
    state()
], DataTable.prototype, "allDatas", void 0);
__decorate([
    state()
], DataTable.prototype, "datas", void 0);
__decorate([
    state()
], DataTable.prototype, "filter", void 0);
__decorate([
    state()
], DataTable.prototype, "order", void 0);
//# sourceMappingURL=fwc-data-table.js.map
import { TemplateResult, LitElement } from 'lit';
import { Menu } from '@material/mwc-menu';
import '@material/mwc-icon';
import '@material/mwc-menu/mwc-menu';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon-button/mwc-icon-button';
export declare class FwcChipList extends LitElement {
    static styles: import("lit").CSSResult[];
    menu: Menu;
    input: HTMLInputElement;
    icon: string;
    all: any[];
    additional: any[];
    selectedSet: Set<any>;
    initialSet: Set<any>;
    addedSet: Set<any>;
    removedSet: Set<any>;
    get added(): any[];
    get removed(): any[];
    get selected(): any[];
    set selected(value: any[]);
    protected render(): TemplateResult;
    private getSelectedItems;
    private getAdditionalItems;
    private clearInput;
    private changeInput;
    private showMenu;
    private filteredItems;
    private add;
    private delete;
}
declare global {
    interface HTMLElementTagNameMap {
        'fwc-chip-list': FwcChipList;
    }
}

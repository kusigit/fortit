import { TemplateResult, LitElement } from 'lit';
import { Menu } from '@material/mwc-menu';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-menu';
import '@fortit/fwc-chip';
export declare type ChipItem = {
    id: string;
    name: string;
};
export declare class ChipList extends LitElement {
    static styles: import("lit").CSSResult[];
    menu: Menu;
    input: HTMLInputElement;
    icon: string;
    all: ChipItem[];
    additional: ChipItem[];
    selectedSet: Set<ChipItem>;
    initialSet: Set<ChipItem>;
    addedSet: Set<ChipItem>;
    removedSet: Set<ChipItem>;
    get added(): ChipItem[];
    get removed(): ChipItem[];
    get selected(): ChipItem[];
    set selected(value: ChipItem[]);
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
        'fwc-chip-list': ChipList;
    }
}

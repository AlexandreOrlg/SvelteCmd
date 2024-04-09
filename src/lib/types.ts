// types.ts
import type { SvelteComponent } from 'svelte';
import type {writable, Writable} from "svelte/store";

export type ContextType = {
     registerItem: (component: CommandItem) => () => void,
     selectedID : Writable<string>,
     filteredStore: FilteredStore
};

export type CommandItem = {
    id : string,
    component : SvelteComponent,
    category : string
}

export interface FilteredStore {
    subscribe: Writable<CommandItem[]>["subscribe"];
    searchQueryStore: Writable<string>;
    registerItem: (item: CommandItem, itemIndex: number) => () => void;
    setSearchValue: (value: string) => void;
}
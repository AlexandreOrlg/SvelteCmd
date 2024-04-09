import { get, derived, writable } from "svelte/store";
import Fuse from "fuse.js";
import type {CommandItem, FilteredStore} from "./types";
import { insertWithoutMutation } from "./helpers.js";



export function createFilteredStore(): FilteredStore {
    const registeredItems = writable<CommandItem[]>([]);
    const searchValue = writable<string>("");

    const fuseOptions = {
        keys: ["component.value"],
        shouldSort: false,
        threshold: 0.3,
    };

    // Création d'une instance Fuse dérivée à partir de registeredItems
    const fuse = derived(registeredItems, ($registeredItems) => new Fuse($registeredItems, fuseOptions));

    // Recherche des résultats basée sur les éléments enregistrés, la valeur de recherche et l'instance Fuse
    const searchResults = derived(
        [registeredItems, searchValue, fuse],
        ([$registeredItems, $searchValue, $fuse]) =>
            $searchValue ? $fuse.search($searchValue).map((e) => e.item) as CommandItem[] : $registeredItems
    );

    // Renvoie un objet contenant les différentes méthodes et valeurs du store
    return {
        // Permet de s'abonner aux résultats de la recherche
        subscribe: searchResults.subscribe,
        // Stocke la valeur de la requête de recherche
        searchQueryStore: searchValue,
        // Enregistre un élément dans le store et renvoie une fonction pour le retirer
        registerItem: (item: CommandItem, itemIndex: number) => {
            registeredItems.set(insertWithoutMutation(get(registeredItems), item, itemIndex));
            return () => {
                registeredItems.update((items) => items.filter((e) => e !== item));
            };
        },
        // Met à jour la valeur de recherche pour effectuer une nouvelle recherche
        setSearchValue: (value: string) => {
            searchValue.set(value);
        },
    };
}

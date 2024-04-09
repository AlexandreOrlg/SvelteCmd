<script lang="ts">
    import { setContext } from "svelte";
    import type { ContextType, CommandItem } from "./types";
    import { createFilteredStore } from "./store";
    import { writable } from "svelte/store";


     const filteredStore = createFilteredStore();


    // Création du store pour conserver l'ID sélectionné
    const selectedID = writable<string>("");

    // Référence à l'élément DOM du menu de commandes
    let commandMenuEl: HTMLElement | null = null;

    // Enregistre un élément CommandItem et renvoie une fonction pour le retirer
    function registerItem(item: CommandItem): () => void {
        const itemIndex: number = Array.from(commandMenuEl!.querySelectorAll("[data-id]")).findIndex(
            (e) => e.dataset.id === item.id
        );
        return filteredStore.registerItem(item, itemIndex);
    }

    // Initialise le contexte avec les méthodes et valeurs nécessaires
    setContext<ContextType>("commandMenu", {
        registerItem,
        selectedID,
        filteredStore
    });

    // Gère les événements clavier pour naviguer dans les éléments et les sélectionner
    function handleKeyDown(event: KeyboardEvent): void {
        if (!$filteredStore.length) return;

        const selectedItem: CommandItem | undefined = $filteredStore.find((e) => e.id === $selectedID);
        const itemIndex: number = selectedItem
            ? Array.from(commandMenuEl!.querySelectorAll("[data-id]")).findIndex(
                (e) => e.dataset.id === selectedItem.id
            )
            : -1;

        if (event.key === "ArrowDown") {
            event.preventDefault();
            updateSelectedIndex(itemIndex + 1);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            updateSelectedIndex(itemIndex - 1);
        } else if (event.key === "Enter" && selectedItem) {
            selectedItem.component.emitItemClick();
        }
    }

    // Met à jour l'index sélectionné et fait défiler l'élément en vue si nécessaire
    function updateSelectedIndex(newIndex: number): void {
        const index: number = Math.max(0, Math.min(newIndex, $filteredStore.length - 1));
        let selectedItem: CommandItem = $filteredStore[index];
        $selectedID = selectedItem.id;

        if(newIndex === 0 )
            selectedItem.component.commandItemEl.scrollIntoView({ block: "end" });
        else
            selectedItem.component.commandItemEl.scrollIntoView({ block: "nearest" });
    }
</script>


<div {...$$restProps} tabindex="0" bind:this={commandMenuEl} on:keydown={handleKeyDown}>
    <slot></slot>
</div>

<script lang="ts">
    // Récupération du contexte et des valeurs associées
    import {getContext} from "svelte";
    import type {ContextType} from "./types";

    const context = getContext<ContextType>("commandMenu");
    const { filteredStore } = context;

    // Gestionnaire d'événements pour les événements de saisie de l'élément input
    function handleInput(event: InputEvent): void {
        const target = event.target as HTMLInputElement;
        filteredStore.setSearchValue(target.value);
    }
</script>

<input
        placeholder={$$restProps?.placeholder || "Search..."}
        {...$$restProps}
        type="text"
        on:input={handleInput}
/>

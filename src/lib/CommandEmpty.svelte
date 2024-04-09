<script lang="ts">
    import { getContext } from "svelte";
    import type { ContextType } from "./types";

    // Récupération du contexte et des valeurs associées
    const context: ContextType = getContext<ContextType>("commandMenu");
    const {  filteredStore } = context;
    const { searchQueryStore } = filteredStore;
</script>

{#if $filteredStore.length === 0 && $searchQueryStore}
    <div {...$$restProps}>
        <slot></slot>
    </div>
{/if}

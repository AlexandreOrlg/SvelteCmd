<svelte:options accessors={true} />

<script lang="ts">
    import { getContext, setContext } from "svelte";
    import type { ContextType, CommandItem } from "./types";

    // Récupération du contexte et des valeurs associées
    const context: ContextType = getContext<ContextType>("commandMenu");
    const { searchValue, filteredStore } = context;
    const { searchQueryStore } = filteredStore;



    export let name: string = "";
    export let visible: boolean = true;

    setContext<string>("category", name);

    $: {
        visible = $searchQueryStore
            ? $filteredStore.some((e: CommandItem) => e.category === name)
            : true;
    }
</script>

{#if visible}
    <div>
        <span {...$$restProps}>{name}</span>
        <slot></slot>
    </div>
{/if}

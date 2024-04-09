<svelte:options accessors={true} />

<script lang="ts">
    import {
        createEventDispatcher,
        getContext,
        onMount,
    } from "svelte";
    import { get_current_component } from "svelte/internal";
    import type { ContextType, CommandItem } from "./types";
    import type { SvelteComponent } from "svelte";
    import { generateID } from "./helpers.js";

    // Récupération du contexte et des valeurs associées
    const context = getContext<ContextType>("commandMenu");
    const { registerItem, selectedID, filteredStore } = context;
    const category: string | undefined = getContext<string | undefined>("category");
    const { searchQueryStore } = filteredStore;

    // Déclaration des propriétés exportées
    export let value: string = "";
    export let commandItemEl: HTMLDivElement | null = null;

    // Déclaration des variables internes
    let visible: boolean = true;
    let selected: boolean = true;
    let dataId: string = generateID();
    const componentRef: SvelteComponent = get_current_component() as SvelteComponent;

    // Réactivité pour la visibilité de l'élément
    $: {
        visible = $searchQueryStore
            ? $filteredStore.some((e: CommandItem) => e.id === dataId)
            : true;
    }

    // Réactivité pour la sélection de l'élément
    $: {
        selected = dataId === $selectedID;
    }

    // Enregistrement de l'élément lors du montage du composant
    onMount(() => registerItem({ id: dataId, category, component: componentRef }));

    // Création d'un expéditeur d'événements
    const dispatch = createEventDispatcher<{ itemClick: void }>();

    // Fonction pour émettre un événement lors d'un clic sur l'élément
    export function emitItemClick(): void {
        dispatch("itemClick");
    }
</script>

{#if visible}
    <div
            data-id={dataId}
            {...$$restProps}
            class:selected="{selected}"
            bind:this={commandItemEl}
            on:click={emitItemClick}
            on:mousemove={() => ($selectedID = dataId)}
    >
        <slot>{value}</slot>
    </div>
{/if}

<script lang="ts">

        import {tweened} from "svelte/motion";
        import {quartOut} from "svelte/easing";

        let CommandItemsEl = null;
        let contentHeight = 0;
        let containerHeight = tweened(0, {duration: 700, easing: quartOut });
        $: containerHeight.set(contentHeight);



</script>

<div
        bind:this={CommandItemsEl}
        style="height: {$containerHeight}px;padding-block-end: 8px;">

        <div
                {...$$restProps}
                bind:offsetHeight="{contentHeight}"
        >
        <slot></slot>
        </div>

</div>
<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { getExpandedTiles } from "../tiles";
	export let possibleTypes: ReturnType<typeof getExpandedTiles> = [];

	const dispatch = createEventDispatcher();

	$: collapsed = possibleTypes.length === 1;
	$: {
		if (collapsed) {
			console.log('collapsed');
		}
	}
</script>

<div class="tile" class:collapsed>
	{#each possibleTypes as possibleType}
	<button on:click="{() => dispatch('collapse', possibleType)}">
		<img
			src={`images/${possibleType.type}.png`}
			alt="tile"
			class={`r${possibleType.rotation}`}
		/>
	</button>
	{/each}
</div>

<style>
	button {
		border: none;
		background: none;
		padding: 0;
		margin: 0;
		box-sizing: content-box;
		border: 1px solid grey;
		float: left;
		width: 13px;
		height: 13px;
	}
	.tile {
		box-sizing: border-box;
		width: 64px;
		height: 64px;
		border: 1px solid black;
	}
	.tile img {
		width: 13px;
		height: 13px;
	}
	.tile.collapsed {
		border: none;
	}
	.tile.collapsed button {
		border: none;
	}
	.tile.collapsed img {
		width: 64px;
		height: 64px;
	}
	.r0 {
		transform: rotate(0deg);
	}
	.r1 {
		transform: rotate(90deg);
	}
	.r2 {
		transform: rotate(180deg);
	}
	.r3 {
		transform: rotate(270deg);
	}
</style>

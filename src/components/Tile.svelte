<script lang="ts">
	import type { getExpandedTiles, TileType } from "../tiles";
	export let possibleTypes: ReturnType<typeof getExpandedTiles> = [];
	$: collapsed = possibleTypes.length === 1;
	$: {
		if (collapsed) {
			console.log('collapsed');
		}
	}
</script>

<div class="tile" class:collapsed>
	{#each possibleTypes as possibleType}
		<img src={`images/${possibleType.type}.png`} alt="tile" class={`r${possibleType.rotation}`} />
	{/each}
</div>

<style>
	.tile {
		box-sizing: border-box;
		width: 64px;
		height: 64px;
		border: 1px solid black;
	}
	.tile img {
		box-sizing: content-box;
		float: left;
		width: 13px;
		height: 13px;
		border: 1px solid grey;
	}
	.tile.collapsed {
		border: none;
	}
	.tile.collapsed img {
		border: none;
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

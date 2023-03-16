<script lang="ts">
	import type { TileType } from '../app';

	export let types: TileType[] = [];
	$: collapsed = types.length === 1;
	$: {
		if (collapsed) {
			console.log('collapsed');
		}
	}
</script>

<div class="tile" class:collapsed>
	{#each types as type}
		<img src={`images/${type}.png`} alt="tile" />
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
		width: 29px;
		height: 29px;
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
</style>

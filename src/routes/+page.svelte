<script lang="ts">
	import { tileTypes } from '../app.d';
	import Tile from '../components/Tile.svelte';

	const gridSize = 10;
	let flatGrid = Array.from({ length: gridSize * gridSize }).map((_, index) => {
		return {
			index,
			types: [...tileTypes]
		};
	});

	$: grid = Array.from({ length: gridSize }, (_, i) => {
		return flatGrid.slice(i * gridSize, (i + 1) * gridSize);
	});

	function reduceEntropy() {
		console.log('reduceEntropy');
		// find cells with lowest entropy
		const sortedFlatGrid = [...flatGrid]
			.sort((a, b) => a.types.length - b.types.length)
			.filter((a) => a.types.length > 1);
		const lowestEntropy = sortedFlatGrid[0].types.length;
		console.log({ lowestEntropy });
		const lowestEntropyCells = sortedFlatGrid.filter((cell) => cell.types.length === lowestEntropy);
		// pick a random cell with lowest entropy
		let randomCell = lowestEntropyCells[Math.floor(Math.random() * lowestEntropyCells.length)];
		console.log({ randomCell });
		// pick a random type from the cell
		const randomType = randomCell.types[Math.floor(Math.random() * randomCell.types.length)];
		randomCell.types = [randomType];
		flatGrid = [...flatGrid];
	}
</script>

{#each grid as row, i}
	<div class="row">
		{#each row as { types }, j}
			<Tile {types} />
		{/each}
	</div>
{/each}

<button on:click={reduceEntropy}> random entropy reduction </button>
<button>step</button>

<style>
	.row {
		width: calc(64px * 10);
	}
	.row :global(.tile) {
		float: left;
	}
</style>

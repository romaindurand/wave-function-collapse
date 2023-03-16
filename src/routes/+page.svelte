<script lang="ts">
	import Tile from '../components/Tile.svelte';
	import { addBorders, getExpandedTiles, isMatchingBorder, tileTypes } from '../tiles';

	const gridSize = 10;
	let flatGrid = Array.from({ length: gridSize * gridSize }).map((_, index) => {
		return {
			index,
			possibleTypes: getExpandedTiles([...tileTypes]),
		};
	});

	$: grid = Array.from({ length: gridSize }, (_, i) => {
		return flatGrid.slice(i * gridSize, (i + 1) * gridSize);
	});

	function collapseRandomCell() {
		// find cells with lowest entropy
		const sortedFlatGrid = [...flatGrid]
			.sort((a, b) => a.possibleTypes.length - b.possibleTypes.length)
			.filter((a) => a.possibleTypes.length > 1);
		const lowestEntropy = sortedFlatGrid[0].possibleTypes.length;
		const lowestEntropyCells = sortedFlatGrid.filter((cell) => cell.possibleTypes.length === lowestEntropy);
		// pick a random cell with lowest entropy
		let randomCell = lowestEntropyCells[Math.floor(Math.random() * lowestEntropyCells.length)];
		// pick a random type from the cell
		const randomType = randomCell.possibleTypes[Math.floor(Math.random() * randomCell.possibleTypes.length)];
		randomCell.possibleTypes = [randomType];
		flatGrid = [...flatGrid];
		// get adjacent cells
		const col = randomCell.index % gridSize;
		const row = Math.floor(randomCell.index / gridSize);
		const adjacentCells = [
			grid[row - 1]?.[col],
			grid[row]?.[col + 1],
			grid[row + 1]?.[col],
			grid[row]?.[col - 1],
		]

		const centerCell = addBorders(randomType)
		centerCell.borders.forEach((border, i) => {
			// out of grid
			if (!adjacentCells[i]) return;
			// already collapsed
			if (adjacentCells[i].possibleTypes.length === 1) return;
			//reduce entropy of adjacent cells
			adjacentCells[i].possibleTypes = adjacentCells[i].possibleTypes.filter((possibleType) => {
				const possibleTypeWithBorders = addBorders(possibleType);
				const oppositeBorder = (i + 2) % 4;
				return isMatchingBorder(possibleTypeWithBorders.borders[oppositeBorder], border)
			});
		});
	}
</script>

{#each grid as row, i}
	<div class="row">
		{#each row as { possibleTypes }, j}
			<Tile {possibleTypes} />
		{/each}
	</div>
{/each}
	<button on:click={collapseRandomCell}> random entropy reduction </button>

<style>
	.row {
		width: calc(64px * 10);
	}
	.row :global(.tile) {
		float: left;
	}
</style>

<script lang="ts">
	import TileEl from '../components/Tile.svelte';
	import { getExpandedTiles, isMatchingBorder, tileTypes, type Tile } from '../tiles';

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

	function collapseGrid() {
		while (flatGrid.some((cell) => cell.possibleTypes.length > 1)) {
			collapseRandomCell();
		}
	}

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
		const randomType = pickRandomWheightedTile(randomCell.possibleTypes);
		// const randomType = randomCell.possibleTypes[Math.floor(Math.random() * randomCell.possibleTypes.length)];
		randomCell.possibleTypes = [randomType];
		flatGrid = [...flatGrid];
		reduceAdjacentCellsEntropy(randomCell);
	}

	function pickRandomWheightedTile(tiles: Tile[]): Tile {
		const totalWeight = tiles.reduce((acc, tile) => acc + tile.weight, 0);
		let random = Math.random() * totalWeight;
		for (let i = 0; i < tiles.length; i++) {
			random -= tiles[i].weight;
			if (random < 0) return tiles[i];
		}
		return tiles[0];
	}

	function reduceAdjacentCellsEntropy(currentCell: (typeof flatGrid)[number]) {
		// get adjacent cells
		const col = currentCell.index % gridSize;
		const row = Math.floor(currentCell.index / gridSize);
		const adjacentCells = [
			grid[row - 1]?.[col],
			grid[row]?.[col + 1],
			grid[row + 1]?.[col],
			grid[row]?.[col - 1],
		]

		currentCell.possibleTypes[0].borders.forEach((border, i) => {
			// out of grid
			if (!adjacentCells[i]) return;
			// already collapsed
			if (adjacentCells[i].possibleTypes.length === 1) return;
			//reduce entropy of adjacent cells
			adjacentCells[i].possibleTypes = adjacentCells[i].possibleTypes.filter((possibleType) => {
				const oppositeBorder = (i + 2) % 4;
				return isMatchingBorder(possibleType.borders[oppositeBorder], border);
			});
			//recursively reduce entropy of adjacent cells if this one is now collapsed
			if (adjacentCells[i].possibleTypes.length === 1) reduceAdjacentCellsEntropy(adjacentCells[i]);
		});
	}

	function manualCollapse(index: number, type: Tile) {
		flatGrid[index].possibleTypes = [type];
		flatGrid = [...flatGrid];
		reduceAdjacentCellsEntropy(flatGrid[index]);
	}
</script>

{#each grid as row, i}
	<div class="row">
		{#each row as { possibleTypes, index }, j}
			<TileEl
				{possibleTypes}
				on:collapse={(event) => manualCollapse(index, event.detail)}
			/>
		{/each}
	</div>
{/each}
<button on:click={collapseRandomCell}>random entropy reduction </button>
<button on:click={collapseGrid}>collapse grid</button>

<style>
	.row {
		width: calc(64px * 10);
	}
	.row :global(.tile) {
		float: left;
	}
</style>

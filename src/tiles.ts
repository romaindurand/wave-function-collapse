const tiles: Tile[] = [
	{
		type: 'sea',
		rotations: [0],
		borders: ['water', 'water', 'water', 'water']
	},
	{
		type: 'land',
		rotations: [0],
		borders: ['sand', 'sand', 'sand', 'sand']
	},
	{
		type: 'shore',
		rotations: [0, 1, 2, 3],
		borders: ['sand', 'sand-water', 'water', 'water-sand']
	},
	{
		type: 'land-corner',
		rotations: [0, 1, 2, 3],
		borders: ['sand-water', 'water', 'water', 'water-sand']
	},
	{
		type: 'sea-corner',
		rotations: [0, 1, 2, 3],
		borders: ['water-sand', 'sand', 'sand', 'sand-water']
	}
];

export function getExpandedTiles(types: TileType[]) {
	return tiles
		.filter((tile) => types.includes(tile.type))
		.reduce<{ type: string; rotation: number }[]>((acc, tile) => {
			tile.rotations.forEach((rotation) => {
				acc.push({
					type: tile.type,
					rotation
				});
			});
			return acc;
		}, []);
}

export function addBorders(tile: { type: string; rotation: number }) {
	const { type, rotation } = tile;
	const tileDefinition = tiles.find((tile) => tile.type === type);
	if (!tileDefinition) {
		throw new Error(`Tile type ${type} not found`);
	}
	const borders = rotateBorders(tileDefinition.borders, rotation);
	return { ...tile, borders };
}

function rotateBorders(borders: Border[], rotation: number) {
	const rotatedBorders = [...borders];
	for (let i = 0; i < rotation; i++) {
		rotatedBorders.unshift(rotatedBorders.pop() as Border);
	}
	return rotatedBorders;
}

export function getMatchingBorderIndex(i: number) {
	return (i + 2) % 4;
}

export function isMatchingBorder(b1: Border, b2: Border) {
	return (
		(b1 === 'sand' && b2 === 'sand') ||
		(b1 === 'water' && b2 === 'water') ||
		(b1 === 'sand-water' && b2 === 'water-sand') ||
		(b1 === 'water-sand' && b2 === 'sand-water')
	);
}

export default tiles;

export const tileTypes = ['sea', 'land', 'shore', 'land-corner', 'sea-corner'] as const;
export type TileType = (typeof tileTypes)[number];
export const rotations = [0, 1, 2, 3] as const;
type Rotation = (typeof rotations)[number];
const borders = ['sand', 'water', 'sand-water', 'water-sand'] as const;
type Border = (typeof borders)[number];

export interface Tile {
	type: TileType;
	rotations: Rotation[];
	borders: Border[];
}

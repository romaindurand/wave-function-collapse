import { describe, it, expect } from 'vitest';
import { addBorders, getExpandedTiles, tileTypes } from './tiles';

describe('getExpandedTiles', () => {
	it('expand tiles definitions with available rotations', () => {
		expect(getExpandedTiles([...tileTypes])).toEqual([
			{ type: 'sea', rotation: 0 },
			{ type: 'land', rotation: 0 },
			{ type: 'shore', rotation: 0 },
			{ type: 'shore', rotation: 1 },
			{ type: 'shore', rotation: 2 },
			{ type: 'shore', rotation: 3 },
			{ type: 'land-corner', rotation: 0 },
			{ type: 'land-corner', rotation: 1 },
			{ type: 'land-corner', rotation: 2 },
			{ type: 'land-corner', rotation: 3 }
		]);
	});
});

describe('addBorders', () => {
	it('should add borders to a tile', () => {
		expect(addBorders({ type: 'sea', rotation: 0 })).toEqual({
			type: 'sea',
			rotation: 0,
			borders: ['water', 'water', 'water', 'water']
		});
		expect(addBorders({ type: 'shore', rotation: 3 })).toEqual({
			type: 'shore',
			rotation: 3,
			borders: ['sand-water', 'water', 'water-sand', 'sand']
		});
	});
});

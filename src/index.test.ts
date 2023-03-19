import { describe, it, expect } from 'vitest';
import { getExpandedTiles, tileTypes } from './tiles';

describe('getExpandedTiles', () => {
	it('expand tiles definitions with available rotations', () => {
		expect(getExpandedTiles(['sea'])).toEqual([
			{
				type: 'sea',
				rotation: 0,
				borders: [
					"water",
					"water",
					"water",
					"water",
				],
				weight: 100,
			},
		]);
	});
});


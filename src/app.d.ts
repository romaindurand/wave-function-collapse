// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export const tileTypes = ['sea', 'land', 'shore', 'shore-corner'];
export type TileType = (typeof tileTypes)[number];
export type TileData = {
	type: TileType;
	rotation: number;
};

export {};

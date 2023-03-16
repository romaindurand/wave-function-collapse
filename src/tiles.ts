[
	{
		type: 'sea',
		rotations: [0],
		neighbors: {
			north: [
				{ type: 'sea', rotation: 0 },
				{ type: 'shore', rotation: 0 },
				{ type: 'shore-corner', rotation: 0 },
				{ type: 'shore-corner', rotation: 1 }
			],
			east: [
				{ type: 'sea', rotation: 0 },
				{ type: 'shore', rotation: 1 },
				{ type: 'shore-corner', rotation: 1 },
				{ type: 'shore-corner', rotation: 2 }
			],
			south: [
				{ type: 'sea', rotation: 0 },
				{ type: 'shore', rotation: 2 },
				{ type: 'shore-corner', rotation: 2 },
				{ type: 'shore-corner', rotation: 3 }
			],
			west: [
				{ type: 'sea', rotation: 0 },
				{ type: 'shore', rotation: 3 },
				{ type: 'shore-corner', rotation: 3 },
				{ type: 'shore-corner', rotation: 0 }
			]
		}
	},
	{
		type: 'land',
		rotations: [0],
		neighbors: {
			north: [
				{ type: 'land', rotation: 0 },
				{ type: 'shore', rotation: 2 }
			]
		},
		east: [
			{ type: 'land', rotation: 0 },
			{ type: 'shore', rotation: 3 }
		],
		south: [
			{ type: 'land', rotation: 0 },
			{ type: 'shore', rotation: 0 }
		],
		west: [
			{ type: 'land', rotation: 0 },
			{ type: 'shore', rotation: 1 }
		]
	},
	{
		type: 'shore',
		rotations: [0, 1, 2, 3],
		neighbors: {
			north: [
				{ type: 'land', rotation: 0 },
				{ type: 'shore', rotation: 2 }
			],
			east: []
		}
	}
];

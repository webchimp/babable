import { Scene } from 'phaser';

const TILE_SIZE = 24;

export class Preloader extends Scene {
	constructor() {
		super('Preloader');
	}

	init() {
	}

	preload() {

		this.load.audio('walking-sound', [ 'assets/sounds/walking.ogg' ]);

		this.load.spritesheet('dust-x', 'assets/sprites/characters/dust-x.png', { frameWidth: 24, frameHeight: 24 });
		this.load.spritesheet('dust-y', 'assets/sprites/characters/dust-y.png', { frameWidth: 24, frameHeight: 24 });

		this.load.spritesheet('baba', 'assets/sprites/characters/baba.png', { frameWidth: 24, frameHeight: 24 });
		this.load.spritesheet('keke', 'assets/sprites/characters/keke.png', { frameWidth: 24, frameHeight: 24 });

		this.load.spritesheet('flag', 'assets/sprites/objects/flag.png', { frameWidth: 24, frameHeight: 24 });
		this.load.spritesheet('key', 'assets/sprites/objects/key.png', { frameWidth: 24, frameHeight: 24 });
		this.load.spritesheet('pizza', 'assets/sprites/objects/pizza.png', { frameWidth: 24, frameHeight: 24 });
		this.load.spritesheet('rock', 'assets/sprites/objects/rock.png', { frameWidth: 24, frameHeight: 24 });

		this.load.spritesheet('is-word', 'assets/sprites/words/is.png', { frameWidth: 24, frameHeight: 24 });
		this.load.spritesheet('you-word', 'assets/sprites/words/you.png', { frameWidth: 24, frameHeight: 24 });
		this.load.spritesheet('baba-word', 'assets/sprites/words/baba.png', { frameWidth: 24, frameHeight: 24 });
		this.load.spritesheet('keke-word', 'assets/sprites/words/keke.png', { frameWidth: 24, frameHeight: 24 });
	}

	create() {
		this.input.gamepad.once('connected', function (pad) {
			console.log('Gamepad connected', pad);
		});

		this.scene.start('Sandbox');
	}
}

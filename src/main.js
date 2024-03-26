//import { Boot } from './scenes/Boot';
import { Preloader } from './scenes/Preloader';
import { Sandbox } from './scenes/Sandbox';

const TILE_SIZE = 24;

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
	type: Phaser.AUTO,
	width: TILE_SIZE * 15,
	height: TILE_SIZE * 15,
	parent: 'game-container',
	backgroundColor: '#000000',
	scale: {
		zoom: 2,
	},
	input: {
		gamepad: true,
	},
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
		},
	},
	pixelArt: true,
	roundPixels: true,
	scene: [
		Preloader,
		Sandbox,
	],
};

export default new Phaser.Game(config);

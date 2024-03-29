import Level from './Level';

import Baba from '../entities/Baba';
import Keke from '../entities/Keke';

import Word from '../entities/Word';
import BabaWord from '../entities/BabaWord';
import KekeWord from '../entities/KekeWord';
import IsWord from '../entities/IsWord';
import YouWord from '../entities/YouWord';
import Flag from '../entities/Flag';

export class Sandbox extends Level {
	constructor() {
		super('Sandbox');

		this.statements = [];
		this.history = [];
	}

	create() {
		super.create();

		this.baba = new Baba(this, 2, 2);
		this.keke = new Keke(this, 5, 5);
		this.keke2 = new Keke(this, 8, 8);

		this.kekeWord = new KekeWord(this, 10, 10);
		this.babaWord = new BabaWord(this, 2, 10);
		this.is = new IsWord(this, 3, 10);
		this.you = new YouWord(this, 4, 10);
		this.you2 = new YouWord(this, 5, 12);

		this.flag = new Flag(this, 5, 10);
		this.flag.setPush(true);

		this.flag.setYou(true);
		this.keke.setPush(true);
		this.keke2.setPush(true);
		this.baba.setPush(true);

		this.solveWordChains();
		this.solveStatements();

		// Adding the square as a physics sprite
		this.player = this.physics.add.sprite(0, 0, 'baba');

		this.anims.create({
			key: 'baba-walking',
			frames: this.anims.generateFrameNumbers('baba', { start: 0, end: 11 }),
			frameRate: 10,
			repeat: -1,
		});
		this.player.play('baba-x1');

		// Enable physics properties
		//this.player.setBounce(0.2); // A little bounce
		this.player.setCollideWorldBounds(true); // Collide with the world bounds

		this.playerCursors = this.input.keyboard.createCursorKeys();

		// Add a collider between the player and the ground
		this.physics.add.collider(this.player, this.kekeWord);
		this.physics.add.collider(this.player, this.babaWord);
		this.physics.add.collider(this.player, this.flag);
		this.physics.add.collider(this.player, this.keke);
		this.physics.add.collider(this.player, this.keke2);
		this.physics.add.collider(this.player, this.baba);
		this.physics.add.collider(this.player, this.is);
		this.physics.add.collider(this.player, this.you);
		this.physics.add.collider(this.player, this.you2);

		let ground = this.physics.add.staticGroup();
		for(let i = 0; i < 15; i++) {
			ground.create(i * 24, this.sys.game.config.height, 'you-word').refreshBody();
		}
		this.physics.add.collider(this.player, ground);
	}

	update(time, delta) {
		super.update(time, delta);

		if(this.playerCursors.left.isDown) {

			this.player.setVelocityX(-200); // Move left
			this.player.play('baba-walking', true);
			this.player.flipX = true;

		} else if(this.playerCursors.right.isDown) {

			this.player.setVelocityX(200); // Move right
			this.player.play('baba-walking', true);
			this.player.flipX = false;

		} else {
			this.player.setVelocityX(0); // Stop
			this.player.play('baba-x1');
		}

		console.log(this.player.body.touching.down);

		// Jump if the this.player is touching the ground and the spacebar is pressed
		if(this.playerCursors.space.isDown && this.player.body.touching.down) {
			console.log('jump');
			this.player.setVelocityY(-250); // Apply a velocity in the Y direction to jump
		}
	}
}

import Phaser from 'phaser';
const TILE_SIZE = 24;

export default class Entity extends Phaser.Physics.Arcade.Sprite {

	constructor(scene, { x, y, name = 'entity' }) {

		super(scene, x * TILE_SIZE, y * TILE_SIZE, name);

		this.tile = { x, y };

		// set the origin to the top left corner
		this.setOrigin(0, 0);

		// Add the entity to the scene
		this.scene.add.existing(this);

		this.scene.anims.create({
			key: 'dust-x',
			frames: this.scene.anims.generateFrameNumbers('dust-x', { start: 0, end: 9 }),
			frameRate: 20,
			repeat: 0,
		});

		this.scene.anims.create({
			key: 'dust-y',
			frames: this.scene.anims.generateFrameNumbers('dust-y', { start: 0, end: 9 }),
			frameRate: 20,
			repeat: 0,
		});

		this.cursors = this.scene.input.keyboard.createCursorKeys();

		const controlConfig = {
			camera: this.scene.cameras.main,
			left: this.cursors.left,
			right: this.cursors.right,
			up: this.cursors.up,
			down: this.cursors.down,
			speed: 0.5,
		};

		this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
	}

	createAnim(animKey, key, frames) {
		this.scene.anims.create({
			key: animKey,
			frames: this.scene.anims.generateFrameNumbers(key, { frames }),
			frameRate: 10,
			repeat: -1,
		});
	}

	setYou(flag) {
		this.you = flag;
	}

	setPush(flag) {
		this.push = flag;
	}

	move(axis, direction) {

		const tileToBe = { ...this.tile };
		tileToBe[axis] += direction;

		// do not move if the entity is against the world bounds
		if(tileToBe.x <= -1 && this.cursors.left.isDown) return false;
		if(tileToBe.y <= -1 && this.cursors.up.isDown) return false;

		// get the scene size
		const { width, height } = this.scene.sys.game.canvas;

		if(tileToBe.x >= (width / TILE_SIZE) && this.cursors.right.isDown) return false;
		if(tileToBe.y >= (height / TILE_SIZE) && this.cursors.down.isDown) return false;

		let hitWall = false;

		const entitiesToMove = this.checkTile(tileToBe.x, tileToBe.y);
		entitiesToMove.forEach(entity => {
			if(entity.push) {
				const canMove = entity.move(axis, direction);
				hitWall = hitWall || !canMove;
			}
		});

		if(hitWall) return false;

		if(typeof this.updateSprite === 'function') this.updateSprite(axis, direction);
		this.createDust(axis, direction);

		this.tile[axis] += direction;
		this.animating = true;

		//const sound = this.scene.sound.add('walking-sound');
		//sound.play();

		this.scene.tweens.add({
			targets: this,
			x: this.tile.x * TILE_SIZE,
			y: this.tile.y * TILE_SIZE,
			duration: 150,
			ease: 'Power1',
			onComplete: () => {
				this.animating = false;
				if(typeof this.afterMove === 'function') this.afterMove(axis, direction);

				this.scene.statements = [];
				this.scene.solveWordChains();
				this.scene.solveStatements();
			},
		});

		return true;
	}

	createDust(axis, direction) {

		let dustX;
		let dustY;

		if(axis === 'x') {
			dustX = this.x - ((TILE_SIZE / 2) * direction);
			dustY = this.y;
		} else {
			dustX = this.x;
			dustY = this.y - ((TILE_SIZE / 2) * direction);
		}

		// create a dust sprite behind the entity
		const dust = this.scene.add.sprite(dustX, dustY, `dust-${ axis }`);
		dust.setOrigin(0, 0);

		// dust z-index is the lowest
		dust.setDepth(-1);

		// change sprite color to match the entity
		dust.setTint(this.color || 0xFFFFFF);

		// if the direction is negative, flip the dust sprite
		if(direction === -1) dust.flipX = true;
		dust.anims.play(`dust-${ axis }`);

		// when the dust animation completes, destroy the sprite
		dust.on('animationcomplete', () => { dust.destroy(); });
	}

	checkTile(x, y) {

		const entitiesInTile = [];

		// iterate over all the children in the scene
		for(let i = 0; i < this.scene.children.list.length; i++) {
			const child = this.scene.children.list[i];

			// if the child is an entity
			if(child instanceof Entity) {
				// if the entity is at the given tile
				if(child.tile.x === x && child.tile.y === y) {
					entitiesInTile.push(child);
				}
			}
		}

		return entitiesInTile;
	}

	update(...args) {

		if(!this.you) return false;
		if(this.animating) return false;

		if(this.cursors.left.isDown) {

			this.move('x', -1);

		} else if(this.cursors.right.isDown) {

			this.move('x', 1);

		} else if(this.cursors.up.isDown) {

			this.move('y', -1);

		} else if(this.cursors.down.isDown) {

			this.move('y', 1);
		}
	}
}
import Phaser from 'phaser';
import { v4 as uuidv4 } from 'uuid';
const TILE_SIZE = 24;

export default class Entity extends Phaser.Physics.Arcade.Sprite {

	constructor(scene, { x, y, name = 'entity' }) {

		super(scene, x * TILE_SIZE, y * TILE_SIZE, name);

		this.uid = uuidv4();
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

		if(this.animating) return false;

		console.log('move', axis, direction);

		const { width, height } = this.scene.sys.game.canvas;

		const tileToBe = { ...this.tile };
		tileToBe[axis] += direction;

		// do not move if the entity is against the world bounds
		if(tileToBe.x <= -1) return false;
		if(tileToBe.y <= -1) return false;

		// get the scene size

		if(tileToBe.x >= (width / TILE_SIZE)) return false;
		if(tileToBe.y >= (height / TILE_SIZE)) return false;

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

		//const sound = this.scene.sound.add('walking-sound');
		//sound.play();

		this.animating = true;
		this.scene.registerMovement(this, direction);

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
	}
}
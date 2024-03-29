import { Scene } from 'phaser';
import Word from '../entities/Word';
import Character from '../entities/Character';

const TILE_SIZE = 24;

export default class Level extends Scene {
	constructor() {
		super('Sandbox');

		this.statements = [];
		this.history = [];
		this.movements = [];
		this.moving = false;
	}

	resolveMovements() {

		console.log('resolveMovements', this.movements);

		if(!this.movements.length) {
			this.moving = false;
			return;
		}

		this.movements.forEach(m => {

			this.tweens.add({
				targets: m.entity,
				x: m.entity.tile.x * TILE_SIZE,
				y: m.entity.tile.y * TILE_SIZE,
				duration: 150,
				ease: 'Power1',
				onComplete: () => {
					m.done = true;

					// check if all movements are done
					const allDone = this.movements.every(m => m.done);

					if(allDone) {
						console.log('all done');
						// remove animating from all entities
						this.movements.forEach(m => {
							console.log('done', m.entity);
							m.entity.animating = false;
						});

						this.moving = false;
						this.movements = [];
						this.statements = [];
						this.solveWordChains();
						this.solveStatements();
					}
				},
			});
		});
	}

	solveWordChains() {

		// get all the children of the scene
		const children = this.children.list;

		// filter out the words
		const words = children.filter(child => child instanceof Word);

		// if a word has no words around it, deactivate the word
		words.forEach(word => {
			word.checkState();
		});
	}

	solveStatements() {
		// Iterate all Characters from the scene
		const characters = this.children.list.filter(child => child instanceof Character);

		// remove you to all characters
		characters.forEach(character => {
			character.setYou(false);
		});

		// if there is a baba is you statement, set the baba to you
		const isYou = this.statements.filter(statement => statement.includes('is you'));

		if(isYou.length) {
			characters.forEach(character => {
				if(isYou.some(statement => statement.includes(character.name))) {
					character.setYou(true);
				}
			});
		}
	}

	solveMovement(axis, direction) {

		if(!this.moving) this.moving = true;
		else return;

		// iterate all entities in the scene
		for(let i = 0; i < this.children.list.length; i++) {
			const child = this.children.list[i];

			// check if entity is you
			if(!!child.you) {
				child.move(axis, direction);
			}
		}

		console.log('solveMovement', this.movements);

		this.resolveMovements();
	}

	create() {
		this.cursors = this.input.keyboard.createCursorKeys();
		this.gamepad = this.input.gamepad.getPad(0);
	}

	update(time, delta) {
		super.update(time, delta);

		if(!this.gamepad) this.gamepad = this.input.gamepad.getPad(0);

		if(this.gamepad) {
			if(this.gamepad.left) {
				this.solveMovement('x', -1);
			} else if(this.gamepad.right) {
				this.solveMovement('x', 1);
			} else if(this.gamepad.up) {
				this.solveMovement('y', -1);
			} else if(this.gamepad.down) {
				this.solveMovement('y', 1);
			}
		}

		if(this.cursors.left.isDown) {
			this.solveMovement('x', -1);
		} else if(this.cursors.right.isDown) {
			this.solveMovement('x', 1);
		} else if(this.cursors.up.isDown) {
			this.solveMovement('y', -1);
		} else if(this.cursors.down.isDown) {
			this.solveMovement('y', 1);
		}
	}
}
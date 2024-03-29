import Entity from './Entity';

export default class Word extends Entity {

	constructor(scene, { x, y, name, color }) {
		super(scene, { x, y, name: name });

		this.name = name;

		this.setupAnimations(name);
		this.play(`${ name }-word`);

		this.color = color;
		this.push = true;
		this.wordActive = true;

		this.checkState();
	}

	checkState() {

		/* an active word is one that is part of the following chains:
			- [noun] [verb] [noun]
			- [noun] [verb] [adjective]

			This can be horizontal or vertical and in writing order
		 */

		// get the tile above this one
		const tileAbove = this.checkTile(this.tile.x, this.tile.y - 1).filter(entity => entity instanceof Word);
		const tileBelow = this.checkTile(this.tile.x, this.tile.y + 1).filter(entity => entity instanceof Word);
		const tileLeft = this.checkTile(this.tile.x - 1, this.tile.y).filter(entity => entity instanceof Word);
		const tileRight = this.checkTile(this.tile.x + 1, this.tile.y).filter(entity => entity instanceof Word);

		// get the current word type
		const wordType = this.type;

		if(wordType === 'noun') {
			// check for horizontal chains

			// if there is a verb above or below, this is an active word
			if(tileRight.some(entity => entity.type === 'verb')) {

				// check that the one right is a noun or adjective
				const secondRight = this.checkTile(this.tile.x + 2, this.tile.y);

				if(secondRight.some(entity => entity.type === 'noun' || entity.type === 'adjective')) {
					// Push the statements to the scene
					this.scene.statements.push(this.name + ' ' + tileRight[0].name + ' ' + secondRight[0].name);
					this.scene.statements = [ ...new Set(this.scene.statements) ];
					this.activate();
					// remove duplicates
					return;
				}
			}

			if(tileLeft.some(entity => entity.type === 'verb')) {

				// check that the one left is a noun or adjective
				const secondLeft = this.checkTile(this.tile.x - 2, this.tile.y);

				if(secondLeft.some(entity => entity.type === 'noun' || entity.type === 'adjective')) {
					// Push the statements to the scene
					this.scene.statements.push(secondLeft.name + ' ' + tileLeft[0].name + ' ' + this.name);
					this.scene.statements = [ ...new Set(this.scene.statements) ];
					this.activate();
					return;
				}
			}

			// check for vertical chains
			if(tileAbove.some(entity => entity.type === 'verb')) {

				// check that the one above is a noun or adjective
				const secondAbove = this.checkTile(this.tile.x, this.tile.y - 2);

				if(secondAbove.some(entity => entity.type === 'noun' || entity.type === 'adjective')) {

					// Push the statements to the scene
					this.scene.statements.push(secondAbove.name + ' ' + tileAbove[0].name + ' ' + this.name);
					this.scene.statements = [ ...new Set(this.scene.statements) ];
					this.activate();
					return;
				}
			}

			if(tileBelow.some(entity => entity.type === 'verb')) {

				// check that the one below is a noun or adjective
				const secondBelow = this.checkTile(this.tile.x, this.tile.y + 2);

				if(secondBelow.some(entity => entity.type === 'noun' || entity.type === 'adjective')) {

					// Push the statements to the scene
					this.scene.statements.push(this.name + ' ' + tileBelow[0].name + ' ' + secondBelow.name);
					this.scene.statements = [ ...new Set(this.scene.statements) ];
					this.activate();
					return;
				}
			}
		}

		// if this is a verb
		if(wordType === 'verb') {

			// check for horizontal chains
			if(tileLeft.some(entity => entity.type === 'noun')) {

				if(tileRight.some(entity => entity.type === 'noun' || entity.type === 'adjective')) {

					// Push the statements to the scene
					this.scene.statements.push(tileLeft[0].name + ' ' + this.name + ' ' + tileRight[0].name);
					this.scene.statements = [ ...new Set(this.scene.statements) ];
					this.activate();
					return;
				}
			}

			// check for vertical chains
			if(tileAbove.some(entity => entity.type === 'noun')) {

				if(tileBelow.some(entity => entity.type === 'noun' || entity.type === 'adjective')) {

					// Push the statements to the scene
					this.scene.statements.push(tileAbove[0].name + ' ' + this.name + ' ' + tileBelow[0].name);
					this.scene.statements = [ ...new Set(this.scene.statements) ];
					this.activate();
					return;
				}
			}
		}

		// if this is an adjective
		if(wordType === 'adjective') {

			// check for horizontal chains
			if(tileLeft.some(entity => entity.type === 'verb')) {

				const secondLeft = this.checkTile(this.tile.x - 2, this.tile.y);

				if(secondLeft.some(entity => entity.type === 'noun')) {

					// Push the statements to the scene
					this.scene.statements.push(secondLeft[0].name + ' ' + tileLeft[0].name + ' ' + this.name);
					this.scene.statements = [ ...new Set(this.scene.statements) ];
					this.activate();
					return;
				}
			}

			// check for vertical chains
			if(tileAbove.some(entity => entity.type === 'verb')) {

				const secondAbove = this.checkTile(this.tile.x, this.tile.y - 2);

				if(secondAbove.some(entity => entity.type === 'noun')) {

					// Push the statements to the scene
					this.scene.statements.push(secondAbove[0].name + ' ' + tileAbove[0].name + ' ' + this.name);
					this.scene.statements = [ ...new Set(this.scene.statements) ];
					this.activate();
					return;
				}
			}
		}

		this.deactivate();
	}

	activate() {
		if(!this.wordActive) {

			// Create some dust
			this.createDust('x', 1);
			this.createDust('x', -1);
			this.createDust('y', 1);
			this.createDust('y', -1);
		}

		this.wordActive = true;
		this.setAlpha(1);

	}

	deactivate() {
		this.wordActive = false;
		this.setAlpha(0.5);
	}

	setupAnimations(name) {
		this.createAnim(`${ name }-word`, `${ name }-word`, [ 0, 1, 2 ]);
	}
}
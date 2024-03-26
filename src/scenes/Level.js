import { Scene } from 'phaser';
import Word from '../entities/Word';
import Character from '../entities/Character';

export default class Level extends Scene {
	constructor() {
		super('Sandbox');

		this.statements = [];
		this.history = [];
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

	create() {
		super.create();
	}

	update(time, delta) {
		super.update(time, delta);
	}
}
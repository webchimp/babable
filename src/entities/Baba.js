import Character from './Character';

export default class Baba extends Character {

	constructor(scene, x, y) {
		super(scene, { x, y, name: 'baba', color: 0xFFFFFF });
		this.setupAnimations();
		this.play('baba-x1');
	}
}
import Character from './Character';

export default class Keke extends Character {

	constructor(scene, x, y) {
		super(scene, { x, y, name: 'keke', color: 0xE5533B });
		this.setupAnimations(name);
		this.play('keke-x1');
	}
}
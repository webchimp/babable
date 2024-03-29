import Entity from './Entity';

export default class Word extends Entity {

	constructor(scene, { x, y, name, color }) {
		super(scene, { x, y, name: name });

		this.name = name;

		this.setupAnimations(name);
		this.play(name);

		this.color = color;
	}

	setupAnimations(name) {
		this.createAnim(name, name, [ 0, 1, 2 ]);
	}
}
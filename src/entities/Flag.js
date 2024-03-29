import Object from './Object';

export default class Flag extends Object {

	constructor(scene, x, y) {
		super(scene, { x, y, name: 'flag', color: 0xEDE285 });
		this.setupAnimations(name);
	}
}
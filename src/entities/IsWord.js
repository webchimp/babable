import Word from './Word';

export default class IsWord extends Word {

	constructor(scene, x, y) {
		super(scene, { x, y, name: 'is', color: 0xD9396A });
		this.type = 'verb';
	}
}
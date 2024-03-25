import Word from './Word';

export default class KekeWord extends Word {

	constructor(scene, x, y) {
		super(scene, { x, y, name: 'keke', color: 0xE5533B });
		this.type = 'noun';
	}
}
import Word from './Word';

export default class BabaWord extends Word {

	constructor(scene, x, y) {
		super(scene, { x, y, name: 'baba', color: 0xFFFFFF });
		this.type = 'noun';
	}
}
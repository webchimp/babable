import Word from './Word';

export default class YouWord extends Word {

	constructor(scene, x, y) {
		super(scene, { x, y, name: 'you', color: 0xD9396A });
		this.type = 'adjective';
	}
}
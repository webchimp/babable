import Word from './Word';

export default class PushWord extends Word {

	constructor(scene, x, y) {
		super(scene, { x, y, name: 'push', color: 0x503F24 });
		this.type = 'adjective';
	}
}
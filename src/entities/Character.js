import Entity from './Entity';

export default class Character extends Entity {

	constructor(scene, { x, y, name, color }) {
		super(scene, { x, y, name: name });

		this.name = name;
		this.color = color;

		this.setupAnimations(name);
		this.play(`${ name }-x1`);
	}

	updateSprite = (axis, direction) => {

		// get current animation
		const currentAnim = this.anims.currentAnim.key;

		// remove the last character from the animation key
		let anim;

		// get the last character from the animation key
		const frame = currentAnim.substr(currentAnim.length - 1);

		// increment the frame, if the frame is greater than 4, reset it to 1
		const nextFrame = parseInt(frame) === 4 ? 1 : parseInt(frame) + 1;

		// if the direction is 0, flip the sprite
		if(axis === 'x') {
			this.flipX = direction === -1;
			anim = `${ this.name }-x`;
		}

		// if axis is y and direction is 1
		if(axis === 'y') {
			if(direction === 1) anim = `${ this.name }-down`;
			if(direction === -1) anim = `${ this.name }-up`;
		}

		// play the next animation
		this.play(`${ anim }${ nextFrame }`);
	};

	setupAnimations(name) {

		this.createAnim(`${ name }-x1`, name, [ 0, 4, 8 ]);
		this.createAnim(`${ name }-x2`, name, [ 1, 5, 9 ]);
		this.createAnim(`${ name }-x3`, name, [ 2, 6, 10 ]);
		this.createAnim(`${ name }-x4`, name, [ 3, 7, 11 ]);

		this.createAnim(`${ name }-up1`, name, [ 12, 16, 20 ]);
		this.createAnim(`${ name }-up2`, name, [ 13, 17, 21 ]);
		this.createAnim(`${ name }-up3`, name, [ 14, 18, 22 ]);
		this.createAnim(`${ name }-up4`, name, [ 15, 19, 23 ]);

		this.createAnim(`${ name }-down1`, name, [ 24, 28, 32 ]);
		this.createAnim(`${ name }-down2`, name, [ 25, 29, 33 ]);
		this.createAnim(`${ name }-down3`, name, [ 26, 30, 34 ]);
		this.createAnim(`${ name }-down4`, name, [ 27, 31, 35 ]);
	}
}
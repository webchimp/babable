import Level from './Level';

import Baba from '../entities/Baba';
import Keke from '../entities/Keke';

import Word from '../entities/Word';
import BabaWord from '../entities/BabaWord';
import KekeWord from '../entities/KekeWord';
import IsWord from '../entities/IsWord';
import YouWord from '../entities/YouWord';

export class Sandbox extends Level {
	constructor() {
		super('Sandbox');

		this.statements = [];
		this.history = [];
	}

	create() {
		this.baba = new Baba(this, 2, 2);
		this.baba.unique = 'BABA';

		this.keke = new Keke(this, 5, 5);
		this.keke.unique = 'KEKE1';

		this.keke2 = new Keke(this, 8, 8);
		this.keke2.unique = 'KEKE2';

		this.kekeWord = new KekeWord(this, 10, 10);
		this.babaWord = new BabaWord(this, 2, 10);
		this.is = new IsWord(this, 3, 10);
		this.you = new YouWord(this, 4, 10);

		this.baba.setYou(true);
		this.keke.setPush(true);
		this.keke2.setPush(true);
		this.baba.setPush(true);

		this.solveWordChains();
		this.solveStatements();
	}

	update(time, delta) {
		this.baba.update();
		this.keke.update();
		this.keke2.update();
	}
}

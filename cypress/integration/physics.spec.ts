import { Pythagorean, IsCollideWithBubbles } from '../../lib/utils';
import { Noise2D } from '../../lib/noiseGenerators';

describe('Physics', () => {
	it('Pythagorean', () => {		
		expect(Pythagorean(3, 4)).to.equal(5);
		expect(Pythagorean(115, 252)).to.equal(277);
	});

	it('Collision', () => {
		expect(IsCollideWithBubbles([0, 0, 50], [[0, 60 / 20, 50]])).to.be.true;
		expect(IsCollideWithBubbles([0, 0, 50], [[0, 120 / 20, 50]])).to.be.false;
	});
	
	it('2D Noise', () => {
		let brokenRule = false;
		for (let i = 0; i < 20; i++) {
			if (Noise2D(i) < 0 || Noise2D(i) > 1) {
				brokenRule = true;
			}
		}
		expect(brokenRule).to.be.false;
	});
});

export {};
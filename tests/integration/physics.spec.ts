import { pythagorean, IsCollideWithBubbles } from '../../lib/utils';
import { noise2d } from '../../lib/noiseGenerators';

describe('Physics', () => {
	it('Pythagorean', () => {		
		expect(pythagorean(3, 4)).to.equal(5);
		expect(pythagorean(115, 252)).to.equal(277);
	});

	it('Collision', () => {
		expect(IsCollideWithBubbles([0, 0, 50], [[0, 60 / 20, 50]])).to.be.true;
		expect(IsCollideWithBubbles([0, 0, 50], [[0, 120 / 20, 50]])).to.be.false;
	});
	
	it('2D Noise', () => {
		let brokenRule = false;
		for (let i = 0; i < 20; i++) {
			if (noise2d(i) < 0 || noise2d(i) > 1) {
				brokenRule = true;
			}
		}
		expect(brokenRule).to.be.false;
	});
});

export {};
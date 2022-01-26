import { createCanvas, CanvasRenderingContext2D, registerFont, loadImage } from 'canvas';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { fillAlignedText, wrapText } from '../../lib/canvasUtils';
import summaryFacts from '../../lib/summaryData';

const drawText = (context: CanvasRenderingContext2D, x: number, y: number, data: {name: string, summary: string}) => {
	context.font = 'bold 35px Roboto';
	const wrappedName = wrapText(context, data.name, (e) => ((e + 1) ** 0.3) * 200);
	fillAlignedText(context, wrappedName, x, y - 120);
	
	context.font = '21px Roboto';
	const wrappedSummary = wrapText(context, data.summary, (e) => Math.cos((-6.5 + e + wrappedName.length * 2) * 0.18) * 305);
	fillAlignedText(context, wrappedSummary, x, y + wrappedName.length * 35 - 120);
};

const Summary = async (req: NextApiRequest, res: NextApiResponse) => {
	const canvas = createCanvas(750, 1000);

	const context = canvas.getContext('2d', {alpha: false});
	registerFont(path.resolve('./public/fonts/Roboto-Bold.ttf'), {family: 'Roboto', weight: 'bold'});
	registerFont(path.resolve('./public/fonts/Roboto-Regular.ttf'), {family: 'Roboto', weight: 'normal'});
	const cacheImage = await loadImage(path.resolve('./public/assets/api-cache-summary.jpg'));

	context.textAlign = 'center';
	context.textBaseline = 'middle';

	context.drawImage(cacheImage, 0, 0);

	const randomFact = summaryFacts[Math.floor(Math.random() * summaryFacts.length)];
	const branches = randomFact.branch.slice();
	drawText(context, 375, 486, randomFact);
	drawText(context, 185, 815, branches.splice(Math.floor(Math.random() * branches.length), 1)[0]);
	drawText(context, 565, 815, branches.splice(Math.floor(Math.random() * branches.length), 1)[0]);

	res.status(200);
	res.setHeader('Content-Type', 'image/jpeg');
	res.end(canvas.toBuffer('image/jpeg', {quality: 0.5}));
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default Summary;
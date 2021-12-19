import { createCanvas, CanvasRenderingContext2D, registerFont } from 'canvas';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { fillAlignedText, wrapText } from '../../lib/canvasUtils';
import summaryFacts from '../../lib/summaryData';

const drawConnections = (context: CanvasRenderingContext2D) => {
	context.beginPath();
	context.moveTo(375, 175);
	context.lineTo(375, 486);
	context.moveTo(185, 815);
	context.lineTo(375, 486);
	context.lineTo(565, 815);
	context.stroke();
};

const drawBubble = (context: CanvasRenderingContext2D, x: number, y: number, data: {name: string, summary: string}) => {
	context.fillStyle = '#f8f8f8';
	context.shadowBlur = 25;
	context.shadowColor = 'hsl(0, 0%, 70%)';
	context.beginPath();
	context.arc(x, y, 170, 0, Math.PI * 2, true);
	context.fill();
	
	context.fillStyle = '#000';
	context.font = 'bold 35px Roboto';
	const wrappedName = wrapText(context, data.name, (e) => ((e + 1) ** 0.3) * 200);
	// fillAlignedText(context, wrappedName, x, y - 120);
	
	context.font = '21px Roboto';
	const wrappedSummary = wrapText(context, data.summary, (e) => Math.cos((-6.5 + e + wrappedName.length * 2) * 0.18) * 305);
	// fillAlignedText(context, wrappedSummary, x, y + wrappedName.length * 35 - 120);
};

const Summary = async (req: NextApiRequest, res: NextApiResponse) => {
	const canvas = createCanvas(750, 1000);

	const context = canvas.getContext('2d', {alpha: false});
	registerFont(path.resolve('./public/fonts/Roboto-Bold.ttf'), {family: 'Roboto', weight: 'bold'});
	registerFont(path.resolve('./public/fonts/Roboto-Regular.ttf'), {family: 'Roboto', weight: 'normal'});
	
	context.fillStyle = '#fff';
	context.fillRect(0, 0, 750, 1000);
	context.fillStyle = '#0d1117';
	context.fillRect(0, 0, 750, 175);

	context.strokeStyle = '#0d1117';
	context.lineWidth = 2;
	for (let i = 0; i < 11; i++) {
		context.beginPath();
		context.moveTo(0, 175 + (i * 7));
		context.lineTo(750, 175 + (i * 7));
		context.stroke();
	}

	context.fillStyle = '#fff';
	context.lineWidth = 4;
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	
	context.font = 'bold 55px Roboto';
	context.fillText('Random Facts About:', 375, 50);
	context.fillText('Kyle Smith', 375, 120);

	drawConnections(context);

	const randomFact = summaryFacts[Math.floor(Math.random() * summaryFacts.length)];
	const branches = randomFact.branch.slice();
	drawBubble(context, 375, 486, randomFact);
	drawBubble(context, 185, 815, branches.splice(Math.floor(Math.random() * branches.length), 1)[0]);
	drawBubble(context, 565, 815, branches.splice(Math.floor(Math.random() * branches.length), 1)[0]);

	res.status(200);
	res.setHeader('Content-Type', 'image/jpeg');
	res.end(canvas.toBuffer('image/jpeg', {quality: 0.6}));
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default Summary;
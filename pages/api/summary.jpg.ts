import { createCanvas, CanvasRenderingContext2D, registerFont } from 'canvas';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import summaryFacts from '../../lib/summaryData';

/**
 * Convert text to an array of lines, wrapping at the specified width.
 * @param context - The canvas context to use for measuring text.
 * @param text - The text to wrap.
 * @param maxWidth - The maximum width of each line.
 * @returns Wrapped text.
 */
const wrapText = (context: CanvasRenderingContext2D, text: string, maxWidth: (localHeight: number) => number): string[] => {
	const words = text.split(' ');
	
	const lines = [];
	let currentLine = words[0];

	for (let i = 1; i < words.length; i++) {
		const width = context.measureText(currentLine + ' ' + words[i]).width;
		if (width < maxWidth(lines.length)) {
			currentLine += ' ' + words[i];
		}
		else {
			lines.push(currentLine);
			currentLine = words[i];
		}
	}
	lines.push(currentLine);
	return lines;
};

const fillAlignedText = (context: CanvasRenderingContext2D, wrappedText: string[], x: number, y: number) => {
	const measuredText = context.measureText('M');
	const lineHeight = measuredText.actualBoundingBoxAscent + measuredText.actualBoundingBoxDescent + 8;

	for (let i = 0; i < wrappedText.length; i++) {
		wrappedText[i] = wrappedText[i].trim();
		context.fillText(wrappedText[i], x, y + (i * lineHeight));
	}
};

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
	context.shadowColor = 'hsl(0, 0%, 70%)';
	context.shadowBlur = 15;
	context.fillStyle = '#f8f8f8';
	context.beginPath();
	context.arc(x, y, 170, 0, Math.PI * 2, true);
	context.fill();
	
	context.shadowColor = 'transparent';
	context.fillStyle = '#000';
	context.font = 'bold 35px Roboto';
	const wrappedName = wrapText(context, data.name, (e) => ((e + 1) ** 0.3) * 200);
	fillAlignedText(context, wrappedName, x, y - 120);
	
	context.font = '21px Roboto';
	const wrappedSummary = wrapText(context, data.summary, (e) => Math.cos((-6.5 + e + wrappedName.length * 2) * 0.18) * 305);
	fillAlignedText(context, wrappedSummary, x, y + wrappedName.length * 35 - 120);
};

const Summary = (req: NextApiRequest, res: NextApiResponse) => {
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
	context;
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
	return;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default Summary;
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

export {wrapText, fillAlignedText};
import { noise2d } from '@lib/noiseGenerators';
import { streamGenerator } from './stream';

const squareRootOfFour = Math.sqrt(4);

const transformCoordinateToCanvas = (point: number, canvasLength: number): number => {
  return ((point * squareRootOfFour) + 1) * canvasLength * 0.5;
};

const calculateRandomAngle = (stream: ReturnType<typeof streamGenerator>) => {
  const transform = stream.startAngle - (stream.angleSqueeze * 0.5);
  const scale = Math.random() * stream.angleSqueeze;
  return scale + transform;
};

const calculateCurrentPosition = (
  stream: ReturnType<typeof streamGenerator>,
  startPosition: [number, number],
  endPosition: [number, number],
  driftOffset: [number, number],
  progress: number,
): [number, number] => {

  // Calculates the position between start to end it is at.
  const startWeight = progress * -1.5 + 1;
  const endWeight = progress * 1.5 + 0.5;
  const cursorWeight = Math.min(progress * 1.5, progress * -1.5 + 1.5);
  const position: [number, number] = [
    (startPosition[0] * startWeight) + (endPosition[0] * endWeight) + (stream.mousePosition[0] * cursorWeight),
    (startPosition[1] * startWeight) + (endPosition[1] * endWeight) + (stream.mousePosition[1] * cursorWeight),
  ];
  
  // Calculates small drift in the particles
  const localDrift = [
    (noise2d(driftOffset[0] + progress * 10) - 0.5) * stream.angleSqueeze,
    (noise2d(driftOffset[1] + progress * 10) - 0.5) * stream.angleSqueeze,
  ];
  const globalDriftScalar = [
    noise2d(stream.globalTransformDrift[0] + position[0] * 10) - 0.5,
    noise2d(stream.globalTransformDrift[1] + position[1] * 10) - 0.5,
  ];
  const globalDrift = [
    (Math.abs(globalDriftScalar[0]) ** 0.6) * 0.1 * Math.sign(globalDriftScalar[0]),
    (Math.abs(globalDriftScalar[1]) ** 0.6) * 0.1 * Math.sign(globalDriftScalar[1]),
  ];
  const totalDrift = [localDrift[0] + globalDrift[0], localDrift[1] + globalDrift[1]];
  return [position[0] + totalDrift[0], position[1] + totalDrift[1]];
};

const particleGenerator = (canvasSize: [number, number], stream: ReturnType<typeof streamGenerator>) => {
  const angle = calculateRandomAngle(stream);
  const driftOffset: [number, number] = [Math.random() * 100, Math.random() * 100];

  // Define end and start positions.
  let endPosition: [number, number] = [Math.cos(angle + Math.PI), Math.sin(angle + Math.PI)];
  let startPosition: [number, number] = [Math.cos(angle), Math.sin(angle)];

  // Calculate a random position between start and end points.
  let progress = Math.random();
  let position = calculateCurrentPosition(stream, startPosition, endPosition, driftOffset, progress);
  
  return {
    animate: (stream: ReturnType<typeof streamGenerator>) => {
      // If the angle to the end changed significantly, it's likely passed
      // This particle will need to be repositioned back at start
      if (progress > 1) {
        const angle = calculateRandomAngle(stream);
        
        // Position particle at the center and deviate the progress slightly to prevent patterns
        endPosition = [Math.cos(angle + Math.PI), Math.sin(angle + Math.PI)];
        startPosition = [Math.cos(angle), Math.sin(angle)];
        progress = Math.random() * 0.005;
        position = calculateCurrentPosition(stream, startPosition, endPosition, driftOffset, progress);
      }
      else {
        progress += 0.005;
        
        // Move element to end position
        const goalPosition = calculateCurrentPosition(stream, startPosition, endPosition, driftOffset, progress);

        const anglePath = Math.atan2(goalPosition[1] - position[1], goalPosition[0] - position[0]);
        const positionDeviation = [Math.cos(anglePath), Math.sin(anglePath)];

        position = [
          position[0] + positionDeviation[0] * 0.005,
          position[1] + positionDeviation[1] * 0.005,
        ];
      }
    },
    render: (context: CanvasRenderingContext2D, dotImage: HTMLImageElement) => {
      context.beginPath();
      const opacity = Math.max(Math.min(progress * 4, 1, progress * -4 + 4), 0);
      context.globalAlpha = opacity;
      context.arc(
        transformCoordinateToCanvas(position[0], canvasSize[0]),
        transformCoordinateToCanvas(position[1], canvasSize[1]),
      1, 0, Math.PI * 2);
      context.fill();
    }
  };
};

export { particleGenerator };
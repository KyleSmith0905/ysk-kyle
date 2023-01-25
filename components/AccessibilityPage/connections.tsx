import { FunctionComponent, useEffect, useState } from 'react';
import { RecursiveBubble } from './infoBlock';

const Connections: FunctionComponent<{
  recursiveBubble: RecursiveBubble;
  slug: string;
}> = ({
  recursiveBubble, slug,
}) => {

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [mainLines, setMainLines] = useState<[number, number, number][]>([]);
  const [curveInLines, setCurveInLines] = useState<[number, number][]>([]);
  const [circles, setCircles] = useState<[number, number][]>([]);

  useEffect(() => {
    const recalculateConnection = () => {
      
      const pageContainer = document.getElementById('accessibilityPage');
      setWidth(pageContainer?.scrollWidth ?? window.innerWidth);
      setHeight(pageContainer?.scrollHeight ?? window.innerHeight);

      const scrollOffset = pageContainer?.scrollTop ?? 0;
      
      // An array of all the groups of children elements
      const groups = [[recursiveBubble], recursiveBubble.children];
      
      // New groups to investigate on the next turnaround, reset every loop.
      let currentInvestigation = [];
      let newInvestigation = recursiveBubble.children;
      
      // Groups together all elements on the same row together.
      for (let i = 0; i < 100; i++) {
        currentInvestigation = [...newInvestigation];
        newInvestigation = [];
        
        for (let j = 0; j < currentInvestigation.length; j++) {
          const investigationItem = currentInvestigation[j];
          
          if (investigationItem.children.length === 0) continue;
          newInvestigation.push(...investigationItem.children);
          groups.push(investigationItem.children);
        }
      }

      const circles: [number, number][] = [];
      const mainLines: [number, number, number][] = [];
      const curveInLines: [number, number][] = [];

      // Navigate through each line group and create circles and lines for them
      for (const group of groups) {

        // Apply circles to all the branching points
        const allNotLast = group.slice(0, -1);
        for (const element of allNotLast) {
          const bubble = document.getElementById(`Bubble_${slug}_${element.bubble.id}`);
          const bubbleRect = bubble?.getBoundingClientRect();
          
          if (bubbleRect) {
            circles.push([bubbleRect.x - 25, bubbleRect.y + scrollOffset + 40]);
          }
        }

        // Connect a line through group, but exclude top group
        if (group.length > 0 && group[0].bubble.connection !== '.') {
          const firstBubble = document.getElementById(`Bubble_${slug}_${group[0].bubble.id}`);
          const firstBubbleRect = firstBubble?.getBoundingClientRect();
          const lastBubble = document.getElementById(`Bubble_${slug}_${group[group.length - 1].bubble.id}`);
          const lastBubbleRect = lastBubble?.getBoundingClientRect();
  
          if (firstBubbleRect && lastBubbleRect) {
            mainLines.push([firstBubbleRect.x - 25, firstBubbleRect.y + scrollOffset + 3, lastBubbleRect.y + scrollOffset + 35]);
          }
        }

        // Add a curveInLine on every element besides the top layer
        for (const element of group) {
          if (element.bubble.connection === '.') continue;
          const bubble = document.getElementById(`Bubble_${slug}_${element.bubble.id}`);
          const bubbleRect = bubble?.getBoundingClientRect();
          
          if (bubbleRect) {
            curveInLines.push([bubbleRect.x - 25, bubbleRect.y + scrollOffset + 50]);
          }
        }
      }

      setCircles(circles);
      setMainLines(mainLines);
      setCurveInLines(curveInLines);
    };

    recalculateConnection();
    addEventListener('resize', recalculateConnection);

    return () => {
      removeEventListener('resize', recalculateConnection);
    };
  }, [recursiveBubble, slug]);

  return (
    <svg className='connections' width={width} height={height} fill='transparent' stroke='var(--color-text)' strokeWidth={2}>
      <path d={mainLines.map((e) => `M${e[0]},${e[1]} V${e[2]}`).join(' ')} />
      <path d={curveInLines.map((e) => `M${e[0] + 20},${e[1] + 5} A20,20,0,0,1,${e[0]},${e[1] - 15}`).join(' ')} />
      {circles.map((circle) => (
        <circle key={circle[1]} cx={circle[0]} cy={circle[1]} r={5} fill='var(--color-primary)'></circle>
      ))}
    </svg>
  );
};

export default Connections;
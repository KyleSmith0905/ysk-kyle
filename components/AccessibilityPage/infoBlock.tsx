import Link from 'next/link';
import { IBubble } from '../../lib/bubbleData/_shared';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { Button } from '../Button';
import Image from 'next/future/image';

interface RecursiveBubble {
  bubble: IBubble,
  children: RecursiveBubble[];
}

const InfoBlock: FunctionComponent<{
  recursiveBubble: RecursiveBubble;
  slug: string;
  setBubbles: Dispatch<SetStateAction<IBubble[]>>
}> = ({
  recursiveBubble, slug, setBubbles,
}) => {
  const bubble = recursiveBubble.bubble;

  const changePage = async (bubbleScene: string) => {
    const bubbleDataImport = await import('../../lib/bubbleData/' + bubbleScene);
    const bubbles = bubbleDataImport.default;
    setBubbles(structuredClone(bubbles.slice().reverse()));
  };

  return (
    <div key={bubble.id} className='bubbleContainer'>
      {bubble.summary !== undefined && (
        <div className='bubbleBlock ConnectionLines' id={`Bubble_${slug}_${bubble.id}`}>
          <div>
            <div className='bubbleHeader'>
              {bubble.size === 'large' && <h1>{bubble.name}</h1>}
              {(bubble.size === 'medium' || !bubble.size) && <h2>{bubble.name}</h2>}
              {bubble.size === 'small' && <h3>{bubble.name}</h3>}
              {(bubble.link && bubble.link.startsWith('https://')) && (
                <Link href={bubble.link} passHref={true}>
                  <span>
                    <Button polymorphic='a' target='_blank' size='small'>Navigate There</Button>
                  </span>
                </Link>
              )}
              {(bubble.link && !bubble.link.startsWith('https://')) && (
                <Link href={bubble.link}>
                  <span>
                    <Button onClick={() => changePage(bubble.link ?? 'index')} size='small'>More Details</Button>
                  </span>
                </Link>
              )}
              {bubble.image && (
                <div className='inlineImageContainer'>
                  <Image
                    src={`/images/${bubble.image}.png`}
                    alt=''
                    quality={50}
                    fill={true}
                    priority={true}
                    className='inlineImage'
                  />
                </div>
              )}
            </div>
            <p>{bubble.summary}</p>
          </div>
        </div>
      )}
      {bubble.summary === undefined && (
        <div className='bubbleBlock' id={`Bubble_${slug}_${bubble.id}`}>
          <div className='imageContainer'>
            <Image
              src={`/images/${bubble.image}.png`}
              alt={bubble.name}
              quality={50}
              fill={true}
              priority={true}
              className='image'
            />
          </div>
        </div>
      )}
      <div className='children'>
        {recursiveBubble.children?.map((children) => (
          <InfoBlock key={children.bubble.id} recursiveBubble={children} slug={slug} setBubbles={setBubbles}/>
        ))}
      </div>
    </div>
  );
};

export type { RecursiveBubble };
export default InfoBlock;
import Link from 'next/link';
import { IBubble } from '../../lib/bubbleData/_shared';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import { Button } from '../Button';

interface RecursiveBubble {
  bubble: IBubble,
  children: RecursiveBubble[];
}

const InfoBlock: FunctionComponent<{
  recursiveBubble: RecursiveBubble;
  slug: string;
}> = ({
  recursiveBubble, slug,
}) => {
  const bubble = recursiveBubble.bubble;

  return (
    <div key={bubble.id} id={`Bubble_${slug}_${bubble.id}`} className='bubbleContainer'>
      {bubble.summary !== undefined && (
        <div className='bubbleBlock'>
          {/* <div> */}
            {bubble.size === 'large' && <h1>{bubble.name}</h1>}
            {(bubble.size === 'medium' || !bubble.size) && <h2>{bubble.name}</h2>}
            {bubble.size === 'small' && <h3>{bubble.name}</h3>}
            {(bubble.link && bubble.link.startsWith('https://')) && (
              <Link href={bubble.link}>
                <Button size='small'>Navigate There</Button>
              </Link>
            )}
            {(bubble.link && !bubble.link.startsWith('https://')) && (
              <Link href={bubble.link}>
                <Button size='small'>More Details</Button>
              </Link>
            )}
            <br/>
            <p>{bubble.summary}</p>
          {/* </div> */}
          {/* <div className='bubbleSideImage'>
            <Image
              src={'/images/' + bubble.image + '.png'}
              alt={bubble.name}
              quality={50}
              priority={true}
              height={160}
              layout='fill'
              objectFit='contain'
            />
          </div> */}
        </div>
      )}
      {bubble.summary === undefined && (
        <div className='image'>
          <Image
            src={'/images/' + bubble.image + '.png'}
            alt={bubble.name}
            quality={50}
            priority={true}
            height={160}
            layout='fill'
            objectFit='contain'
          />
        </div>
      )}
      <div className='children'>
        {recursiveBubble.children?.map((children) => (
          <InfoBlock key={children.bubble.id} recursiveBubble={children} slug={slug}/>
        ))}
      </div>
    </div>
  );
};

export type { RecursiveBubble };
export default InfoBlock;
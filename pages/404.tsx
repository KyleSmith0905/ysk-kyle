import { NextPage } from 'next';
import bubbles from '../lib/bubbleData/_404';
import BubblePage from './[slug]';

const MissingPage: NextPage = () => {
	return <BubblePage slug='_404' bubbles={bubbles}/>;
};

export default MissingPage;
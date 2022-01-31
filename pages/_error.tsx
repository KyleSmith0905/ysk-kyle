import { NextPage } from 'next';
import bubbles from '../lib/bubbleData/_error';
import BubblePage from './[slug]';

const ErrorPage: NextPage = () => {
	return <BubblePage slug='_error' bubbles={bubbles}/>;
};

export default ErrorPage;
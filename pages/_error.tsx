import { NextPage } from 'next';
import BubblePage from './[slug]';

const ErrorPage: NextPage = () => {
	return <BubblePage slug='_error'/>;
};

export default ErrorPage;
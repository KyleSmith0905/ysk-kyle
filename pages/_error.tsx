import { NextPage } from 'next';
import BubblePage from './[slug]';

const MissingPage: NextPage = () => {
	return <BubblePage slug='_error'/>;
};

export default MissingPage;
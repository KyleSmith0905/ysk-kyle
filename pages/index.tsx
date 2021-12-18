import { NextPage } from 'next';
import BubblePage from './[slug]';

const HomePage: NextPage = () => {
	return <BubblePage slug='index'/>;
};

export default HomePage;
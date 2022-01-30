import { GetServerSideProps, NextPage } from 'next';
import BubblePage from './[slug]';

const HomePage: NextPage = () => {
	return <BubblePage slug='index'/>;
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	return {
		props: {
			cookies: req.cookies,
		}
	};
};
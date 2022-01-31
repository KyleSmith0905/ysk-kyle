import { GetServerSideProps, NextPage } from 'next';
import bubbles from '../lib/bubbleData/index';
import { Cookies } from '../lib/cookies';
import { IsUserBot } from '../lib/utils';
import BubblePage from './[slug]';

const HomePage: NextPage<{cookies: Cookies, isUserBot: boolean}> = ({isUserBot = false, cookies}) => {
	return <BubblePage slug='index' bubbles={bubbles} cookies={cookies} isUserBot={isUserBot}/>;
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	return {
		props: {
			cookies: req.cookies,
			isUserBot: IsUserBot(req.headers['user-agent']),
		}
	};
};
import { GetServerSideProps, NextPage } from 'next';
import BubblePage from './[slug]';

const ErrorPage: NextPage = () => {
	return <BubblePage slug='_error'/>;
};

export default ErrorPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	return {
		props: {
			cookies: req.cookies,
		}
	};
};
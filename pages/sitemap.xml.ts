import { readdirSync } from 'fs';
import { GetServerSideProps } from 'next';

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	let allPaths = readdirSync('lib/bubbleData');
	allPaths = allPaths.map(path => path.split('.')[0]);
  allPaths = allPaths.filter(path => !path.startsWith('_'));
  allPaths = allPaths.filter(path => path !== '404');
	allPaths = allPaths.map(path => path === 'index' ? '' : '/' + path);

	let sitemap = '<?xml version="1.0" encoding="UTF-8"?>';
	sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

	for (let i = 0; i < allPaths.length; i++) {
		sitemap += '<url>';
		sitemap += '<loc>https://yskkyle.com' + allPaths[i] + '</loc>';
		sitemap += '<changefreq>monthly</changefreq>';
		if (allPaths[i] === '') sitemap += '<priority>1.0</priority>';
		else sitemap += '<priority>0.5</priority>';
		sitemap += '</url>';
	}

	sitemap += '</urlset>';

	res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
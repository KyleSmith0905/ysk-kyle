import redirectData from './lib/redirects.js';

/**
 * @type {import('next').NextConfig}
 */
const configSettings = {
	trailingSlash: false,
	reactStrictMode: true,
  compress: true,
	redirects: () => {
		return redirectData.redirectMap.map((e) => ({
			source: e.source,
			destination: e.destination,
			permanent: true,
			basePath: false,
		}));
	},
	headers: () => {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'X-XSS-Protection',
						value: '1; mode=block',
					},
					{
						key: 'Strict-Transport-Security',
						value: 'max-age=63072000; includeSubDomains; preload',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
				],
			},
		];
	},
};

export default configSettings;
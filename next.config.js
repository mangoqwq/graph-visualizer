const isProd = process.env.NODE_ENV === 'production'
const repoName = 'graph-visualizer'

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	basePath: isProd ? `/${repoName}` : '',
	assetPrefix: isProd ? `/${repoName}/` : '',
}

module.exports = nextConfig

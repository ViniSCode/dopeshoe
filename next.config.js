/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['tsx', 'ts'],
}

module.exports = nextConfig

module.exports = {
  images: {
    domains: ['media.graphassets.com'],
  },
}
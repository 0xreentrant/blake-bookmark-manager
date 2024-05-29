const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/bookmarks',
        destination: '/bookmarks/all',
        permanent: true
      }
    ]
  }
}

module.exports = withContentlayer(nextConfig)

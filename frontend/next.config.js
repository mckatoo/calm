/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'platform-lookaside.fbsbx.com',
      's2.coinmarketcap.com',
      'ik.imagekit.io'
    ],
  },
}

module.exports = nextConfig

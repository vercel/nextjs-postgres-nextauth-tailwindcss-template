/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: [
      'localhost',
      's3.ap-northeast-2.amazonaws.com'
    ],
  },
  async rewrites() {
    return [
      {
        source: '/server-api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.ap-northeast-2.amazonaws.com'
      }
    ],
    domains: [
      'localhost',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/server-api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/admin/:path*`,
      },
    ];
  },
}

module.exports = nextConfig

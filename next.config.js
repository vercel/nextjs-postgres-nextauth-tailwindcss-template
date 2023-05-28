/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'avatar.vercel.sh'],
    remotePatterns: [{
      protocol: 'https',
      hostname: 'lh3.googleusercontent.com',
      pathname: '/*',
    }]
  },
  experimental: {
    serverComponentsExternalPackages: ['@tremor/react']
  }
};

module.exports = nextConfig;

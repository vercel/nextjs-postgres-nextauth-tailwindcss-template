/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'avatar.tobi.sh'],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@tremor/react'],
  },
};

module.exports = nextConfig;

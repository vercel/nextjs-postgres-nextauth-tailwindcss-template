/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        search: ''
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        search: ''
      }
    ]
  },
  experimental: {
    turbo: {
      dev: true,
      // More specific source map configuration
      resolveSourceMapLocations: ["**/*"],
      // Force inline source maps which WebStorm handles better
      sourceMaps: {
        type: "inline"
      }
    },
  },
  productionBrowserSourceMaps: true,
  // Add webpack configuration to improve source map quality
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.devtool = 'eval-source-map';
    }
    return config;
  },
};

export default nextConfig;
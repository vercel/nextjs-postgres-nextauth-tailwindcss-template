export default {
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
      },
      // Avatars from Mockatoo's mock of GitHub, which signs you in outside
      // production (see lib/auth.ts).
      ...(process.env.NODE_ENV === 'production'
        ? []
        : [
            {
              protocol: 'https',
              hostname: 'app.mockatoo.globalunderdog.com',
              pathname: '/github/avatars/**'
            }
          ])
    ]
  }
};

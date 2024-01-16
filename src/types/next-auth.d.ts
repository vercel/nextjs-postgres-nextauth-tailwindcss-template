import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string,
    token: string,
  }

  interface Session extends DefaultSession {
    accessToken: string | undefined,
    user: {
      id: string,
      auth: string
    }
  }
}

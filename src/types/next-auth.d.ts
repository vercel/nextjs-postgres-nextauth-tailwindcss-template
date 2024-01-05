import NextAuth, {
  Account,
  CookieOption,
  NextAuthOptions,
  Session,
} from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    token?: string
  }

  interface User {
    id: string
    token: string
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    token: string
    sub?: string
    auth?: string[]
    exp?: number
    iat?: number
  }
}

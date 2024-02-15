import NextAuth, { Session, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { jwtDecode } from 'jwt-decode'
import { JWT } from '@auth/core/jwt'
import { ResponseData } from '@/app/(AuthorizedLayout)/_models/common'
import { createHashed } from '@/utils/hashedPassword'

type Login = {
  accessToken: string;
}

export const ACCESS_TOKEN_HEADER = 'Bearer '
export const SIGN_IN_PAGE_PATH = '/authorization/sign-in'
export const SIGN_OUT_PAGE_PATH = '/authorization/sign-out'

// noinspection JSUnusedGlobalSymbols
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: SIGN_IN_PAGE_PATH
  },
  providers: [
    CredentialsProvider({
      authorize: async function(credentials): Promise<User | null> {
        const hashedPassword = createHashed(String(credentials?.password))
        console.log('password', hashedPassword)
        const authResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: credentials?.username,
            password: hashedPassword
          })
        })

        if (!authResponse.ok) {
          return null
        }

        const responseData: ResponseData<Login> = await authResponse.json()
        const jwt = responseData.data!
          .accessToken
          .replace(ACCESS_TOKEN_HEADER, '')
        console.log("authorize jwt", jwt)
        return {
          id: String(credentials?.username),
          token: String(jwt)
        }
      }
    })
  ],
  callbacks: {
    jwt({ token, user }: { token: JWT, user: User }): JWT {
      console.log("jwt", token, user)
      if (user !== undefined && user.token) {
        return {
          ...token,
          ...jwtDecode(user.token),
          accessToken: user.token,
        }
      }
      return token
    },
    session({ session, token }: {
      session: Session,
      token: JWT,
    }): Session {
      console.log("session", session, token)
      if (token === undefined) {
        return session
      }

      return {
        ...session,
        accessToken: String(token.accessToken),
        user: {
          id: String(token.sub),
          auth: String(token.auth),
        }
      }
    },
  },
})

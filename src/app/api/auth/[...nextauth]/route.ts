import NextAuth, { AuthOptions, CookiesOptions, Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'
import { signOut } from 'next-auth/react'

const cookies: Partial<CookiesOptions> = {
  sessionToken: {
    name: `next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: 'none',
      path: '/',
      domain: process.env.NEXT_PUBLIC_DOMAIN,
      secure: true,
    },
  },
}

interface CommonResponse<T> {
  resultCode: string
  message: string
  data: T
}

interface Login {
  accessToken: string
}

export const ACCESS_TOKEN_HEADER = 'Bearer '

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        id: { label: 'id', type: 'text', placeholder: '아이디' },
        password: {
          label: 'password',
          type: 'password',
          placeholder: '비밀번호',
        },
      },
      authorize: async (
        credentials: Record<'id' | 'password', string> | undefined,
      ): Promise<User> => {
        const response = await fetch(
          `${process.env.SERVER_URL}/api/v1/admin/login`,
          {
            method: 'POST',
            body: JSON.stringify({
              id: credentials!.id,
              pw: credentials!.password,
            }),
            headers: { 'Content-Type': 'application/json' },
          },
        )

        const responseData: CommonResponse<Login> = await response.json()
        if (response.ok && responseData) {
          const jwt = responseData.data.accessToken.replace(
            ACCESS_TOKEN_HEADER,
            '',
          )
          return {
            id: credentials!.id,
            token: jwt,
          }
        }

        return Promise.reject(new Error('로그인 실패'))
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  cookies: cookies,
  callbacks: {
    // jwt 만들 때 실행되는 옵션
    jwt: async ({ token, user }: { token: JWT; user: User }) => {
      return { ...token, ...user }
    },
    // 유저 session 이 조회될 때마다 실행되는 옵션
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      return { ...session, ...token }
    },
  },
  pages: {
    signIn: '/auth/sign-in',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

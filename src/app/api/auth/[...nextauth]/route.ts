import NextAuth, { CookiesOptions, NextAuthOptions, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

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

const ACCESS_TOKEN_HEADER = 'Bearer '

const handler = NextAuth({
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
        console.log(responseData)
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
    jwt: async ({ token, user }) => {
      console.log('jwt : ' + token)
      return token
    },
    session: async ({ session, token }) => {
      console.log('session : ' + session, token)
      return session
    },
  },
  pages: {
    signIn: '/auth/sign-in',
  },
})

export { handler as GET, handler as POST }

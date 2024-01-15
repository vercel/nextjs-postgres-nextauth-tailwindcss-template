import NextAuth, { NextAuthConfig, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { ResponseData } from 'thunder-order'

type Login = {
    accessToken: string;
}

const ACCESS_TOKEN_HEADER = 'Bearer '

export const authOptions: NextAuthConfig = {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/authorization/sign-in',
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials): Promise<User | null> {
                const authResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: credentials.username,
                        pw: credentials.password,
                    }),
                })

                if (!authResponse.ok) {
                    return Promise.reject(new Error('로그인 실패'))
                }

                const responseData: ResponseData<Login> = await authResponse.json()
                console.log(responseData)
                return {
                    id: String(credentials!.id),
                    token: responseData.data!
                      .accessToken
                      .replace(ACCESS_TOKEN_HEADER, ''),
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        // jwt 만들 때 실행되는 옵션
        jwt: async ({ token, account }) => {
            return { ...token, ...account }
        }
    },
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth(authOptions);

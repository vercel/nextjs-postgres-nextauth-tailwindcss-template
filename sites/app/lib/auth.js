import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '@/lib/apiCalls/users.js';
import { cookies } from 'next/headers.js';

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET, // Same as `JWT_SECRET`
  providers: [
    CredentialsProvider({
      name: 'credentials',
    credentials: {
      user_name: { label: "User Name", type: "text" },
      password: { label: "Password", type: "password" }
    },

    authorize: async (credentials) => {
        const cookieStore = await cookies();
        try {
          const response = await login({
            user_name: credentials.user_name,
            password: credentials.password,
            timeout: 10000,
          });

          if (!response.ok) {
            throw new Error(response);
          }

          const token = response?.data?.token;
          return response?.data;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // On successful login, attach additional info to the token
      if (user) {
        token.id = user.id;
        token.email = user.user.user_name;
        token.user_name = user.user.user_name;l
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      // Make the returned session match the token data
      if (token) {
        session.id = token.id;
        session.email = token.user_name;
        session.token = token.token;
      }
      return session;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true, // Optional: Encrypt JWT for added security (requires key rotation)
  },
});


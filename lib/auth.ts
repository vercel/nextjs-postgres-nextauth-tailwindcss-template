import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { MockGitHub } from '@mockatoo/connect-authjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Outside production, sign in with Mockatoo's mock of GitHub, so local
  // development and tests need no GitHub OAuth app. Production uses GitHub.
  providers: [process.env.NODE_ENV === 'production' ? GitHub : MockGitHub()]
});

import { type NextAuthOptions } from 'next-auth';
import LineProviders from 'next-auth/providers/line';

export const authOptions: NextAuthOptions = {
  providers: [
    LineProviders({
      clientId: process.env.LINE_CHANEL_ID!,
      clientSecret: process.env.LINE_CLIENT_SECRET!,
      // authorization: { params: { scope: 'openid profile email' } },
      // idToken: true,
      // checks: ['pkce', 'state'],
      // async profile(profile, tokens) {
      //   const { id_token } = tokens;

      //   const firebaseUser = await authAdmin.verifyIdToken(id_token as string);
      //   return {
      //     id: firebaseUser.uid,
      //     name: firebaseUser.name ?? '',
      //     email: firebaseUser.email ?? '',
      //     image: firebaseUser.picture ?? '',
      //     // emailVerified: firebaseUser.email_verified ?? false,
      //   };
      // },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7,
  },
  // debug: true,
  // callbacks: {
  //   async jwt({ token, profile }) {
  //     if (profile) token.uid = profile.id;
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     session.user.uid = token.uid;
  //     return session;
  //   },
  // },
  // pages: {
  //   signIn: '/login',
  // },
  // secret: process.env.NEXTAUTH_SECRET!,
};

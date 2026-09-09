import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "mayilengineering4204@gmail.com";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Only allow the admin email
      if (user.email === ADMIN_EMAIL) {
        return true;
      }
      // Reject all other accounts
      return "/login?error=AccessDenied";
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = session.user.email === ADMIN_EMAIL;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.email === ADMIN_EMAIL;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
});

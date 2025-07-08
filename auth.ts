import NextAuth, { AuthError } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";

import {  upsertUser } from "./drizzle/queries/queries";

type User = {
  id?: string;
  name: string | null;
  email: string;
  hashedPassword?: string;
  phone?: string | null;
  image: string | null;
  provider?: string | null;
  role?: string | null;
  createdAt?: Date | null | undefined;
  updatedAt?: Date | null | undefined;
};

// Providers
const providers: Provider[] = [
  Credentials({
    name: "Credentials",
    credentials: {
      id: { label: "id", type: "text" },
      email: { label: "Email", type: "text" },
      name: { label: "Name", type: "text" },
      image: { label: "Url", type: "url" },
      role: { label: "Role", type: "text" },
    },
    async authorize(credentials): Promise<User | null> {
      console.log(credentials)
      const user = credentials as {
        id: string;
        email: string;
        name: string | null;
        image: string | null;
        role: string | null;
      };

        return {
          id: user.id,
          email: user.email,
          name: user?.name,
          image: user?.image,
          role: user?.role,
        };
     
    },
  }),

  Google({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
];

// ✅ Provider Map (optional)
export const providerMap = providers
  .map((provider) =>
    typeof provider === "function"
      ? provider()
      : { id: provider.id, name: provider.name }
  )
  .filter((provider) => provider.id !== "credentials");

// ✅ Auth.js Handler
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/home/pages/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        const { email, name, image } = user;
        const providerId = account?.providerAccountId || user.id;

        await upsertUser({
          name: name!,
          email: email!,
          image: image!
        })
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.role = (user as any).role ?? "user";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

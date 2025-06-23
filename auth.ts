import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import supabase from "@/app/lib/supabaseServer";

const providers: Provider[] = [
  Credentials({
    credentials: { password: { label: "Password", type: "password" } },
    authorize(c) {
      if (c.password !== "password") return null;
      return {
        id: "test",
        name: "Test User",
        email: "test@example.com",
      };
    },
  }),
  Google,
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/home/pages/sign-in",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const { name, email, image } = user;
        const id = account?.providerAccountId;

        const { data, error } = await supabase
          .from("users")
          .upsert(
            {
              id,
              name,
              email,
              phone_number: "",
              role: "user",
              image,
            },
            {
              onConflict: "id",
              ignoreDuplicates: false,
              returning: "minimal",
              defaultToNull: false,
            }
          )
          .select();

        if (error) {
          console.log("Supabase upsert error.", error);
          return false;
        }

        return true;
      } catch (err) {
        console.log("Supabase upsert error.", err);
        return false;
      }
    },

    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account && profile) {
        token.accessToken = account.access_token;
        token.id = profile.id;
        token.email = profile.email;
        token.picture = profile.picture;
      }
      return token;
    },

    async session({ session, token}) {
     
        session.user.id = token.id
      
      return session
    },
  },
});

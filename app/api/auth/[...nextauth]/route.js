import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import ConnectDB from "@/app/(db)/db";
import User from "@/app/(models)/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials;

        try {
          await ConnectDB();
          const user = await User.findOne({ username });
          if (!user) {
            return false;
          }

          if (password !== user.password) {
            return false; // Return false if password does not match
          }

          return user;
        } catch (error) {
          console.error("Error authorizing user:", error);
          return false;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "./db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error("Email or Password not found");
        }

        await connectDb();
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
          throw new Error("Wrong Email or Password");
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  //all the user details and info we are returning goes to user as params in calbacks jwt
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },

    //sending user details inside session
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30*24*60*60*1000
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  secret: process.env.NEXT_AUTH_SECRET,
};

export default authOptions;

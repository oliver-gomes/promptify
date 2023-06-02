import NextAuth from "next-auth/next";

import GoogleProvider from "next-auth/providers/google";

import User from "../../../models/user";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({ email: session.user.email });

        session.user.id = sessionUser._id.toString();
        return session;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default NextAuth(authOptions);

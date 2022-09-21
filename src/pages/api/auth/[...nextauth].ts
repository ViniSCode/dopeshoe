import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';


export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
  },
})
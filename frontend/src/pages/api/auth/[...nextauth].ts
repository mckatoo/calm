import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { URLSearchParams } from "url";

type AuthorizeInputProps = {
  username: string
  password: string
}

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      authorize: async ({ username, password }: AuthorizeInputProps) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, password })
        })

        const data = await response.json()

        if (data.token) {
          return data
        } else {
          return null
        }

      }
    })
  ],
  callbacks: {
    session: async ({ session, token, user }) => {
      if(!!token.username) session.user['username'] = token.username

      return session
    },
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      if(!!user) token.username = user.username

      return token
    }
  }
})

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '../../../lib/prisma'
import * as bcrypt from "bcrypt"
import { randomBytes } from 'crypto'

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
      if (!!token.userId) session.user['userId'] = token.userId
      if (!!token.username) session.user['username'] = token.username

      const userExist = await prisma.user.findUnique({ where: { email: session.user.email } })

      if (!userExist) {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const password = randomBytes(8).toString('hex')
        const hashedPassword = await bcrypt.hash(password, salt)

        await prisma.user.create({
          data: {
            email: session.user.email,
            username: session.user.email.split('@')[0],
            name: session.user.name,
            password: hashedPassword,
            image: session.user.image
          }
        })
      } else {
        const image = !!userExist.image ? userExist.image : session.user.image
        await prisma.user.update({
          data: {
            email: !!userExist.email ? userExist.email : session.user.email,
            username: !!userExist.username ? userExist.username : session.user.email.split('@')[0],
            name: !!userExist.name ? userExist.name : session.user.name,
            image
          },
          where: { id: userExist.id }
        })
        session.user.image = image
      }

      return session
    },
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      if (!!user) {
        token.userId = user.id
        token.username = user.username
      }

      return token
    }
  }
})

import * as bcrypt from "bcrypt"
import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import { prisma } from "../../../lib/prisma"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, email, password, repeatPassword } = req.body

  const token = await getToken({
    req,
    secret: process.env.SECRET
  })

  if (!token || (token.email !== email)) return res.status(401).json({ message: "Auth required." })

  if (repeatPassword !== password) return res.status(400).json({ error: "Password and Repeat Password do not match" })

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }]
    }
  })

  if (!user) return res.status(400).json({ error: "User not exists" })

  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = await bcrypt.hash(password, salt)

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
    }
  })

  return res.status(204).end()
}

export default handler
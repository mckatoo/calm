import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/prisma"
import * as jwt from "jsonwebtoken"
import * as bcrypt from 'bcrypt'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body
  
  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  const compare = await bcrypt.compare(password, user.password)

  if (!compare) return res.status(400).json({ error: "Authentication failed." })

  const newToken = jwt.sign({ user_id: user.id }, process.env.NEXTAUTH_SECRET, {
    expiresIn: 3600
  });

  return res.status(200).json({ token: newToken, ...user });
}

export default handler
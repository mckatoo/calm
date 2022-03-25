import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/prisma"
import * as bcrypt from "bcrypt"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, username, email, password, repeatPassword } = req.body
  
  if (repeatPassword !== password) return res.status(400).json({ error: "Password and Repeat Password do not match" })

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }]
    }
  })

  if (!!user) return res.status(400).json({ error: "User already exists" })

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      username
    }
  })

  return res.status(201).json({})
}

export default handler
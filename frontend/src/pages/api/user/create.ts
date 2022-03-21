import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/prisma"
import * as bcrypt from "bcrypt"

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, username, email, password, repeatPassword } = req.body
  
  if (repeatPassword !== password) return res.status(400).json({ error: "Passwords do not match" })

  const user = await prisma.user.findMany({
    where: {
      OR: [{ username }, { email }]
    }
  })

  if (!!user.length) return res.status(400).json({ error: "User already exists" })

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

export default create
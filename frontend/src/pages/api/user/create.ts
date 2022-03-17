import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/prisma"

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, username, email, password, repeatPassword } = req.body
  console.log('req.body', req.body)
  if (repeatPassword !== password) return res.status(400).json({ error: "Passwords do not match" })

  const user = await prisma.user.findMany({
    where: {
      OR: [{ username }, { email }]
    }
  })

  if (!!user.length) return res.status(400).json({ error: "User already exists" })

  await prisma.user.create({
    data: {
      name,
      email,
      password,
      username
    }
  })

  return res.status(201).json({})
}

export default create
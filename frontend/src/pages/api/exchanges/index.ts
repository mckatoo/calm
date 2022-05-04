import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt"
import { prisma } from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  const token = await getToken({
    req,
    secret: process.env.SECRET
  })
  
  console.log('token', token)
  if (!token) return res.status(401).json({ message: "Auth required." })


  const exchanges = await prisma.exchanges.findMany({
    where: { userId }
  })

  return res.status(200).json(exchanges);
}

export default handler
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  const exchanges = await prisma.exchanges.findMany({
    where: { userId }
  })

  return res.status(200).json(exchanges);
}

export default handler
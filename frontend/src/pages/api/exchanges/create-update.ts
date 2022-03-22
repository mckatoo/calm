import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/prisma"

const createOrUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    userId,
    binanceKey,
    binanceSecret
  } = req.body

  if (!binanceKey) return res.status(400).json({ error: "Api Key required" })

  const exchanges = await prisma.exchanges.findFirst({
    where: {
      AND: [{ userId, name: 'binance' }]
    }
  })

  if (!exchanges) {
    await prisma.exchanges.create({
      data: {
        userId,
        name: 'binance',
        apiKey: binanceKey,
        secretKey: binanceSecret
      }
    })
    return res.status(201).json({})
  } else {
    await prisma.exchanges.update({
      where: { id: exchanges.id },
      data: {
        userId,
        name: 'binance',
        apiKey: binanceKey,
        secretKey: binanceSecret
      }
    })
    return res.status(204).end()
  }

}

export default createOrUpdate
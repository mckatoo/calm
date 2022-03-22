import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/prisma"
import * as bcrypt from 'bcrypt'

const createOrUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    userId,
    binanceKey,
    binanceSecret
  } = req.body

  if (!binanceKey) return res.status(400).json({ error: "Api Key required" })

  const saltRounds = 5;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedBinanceKey = await bcrypt.hash(binanceKey, salt);
  const hashedBinanceSecret = await bcrypt.hash(binanceSecret, salt);

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
        apiKey: hashedBinanceKey,
        secretKey: hashedBinanceSecret
      }
    })
    return res.status(201).json({})
  } else {
    await prisma.exchanges.update({
      where: { id: exchanges.id },
      data: {
        userId,
        name: 'binance',
        apiKey: hashedBinanceKey,
        secretKey: hashedBinanceSecret
      }
    })
    return res.status(204).end()
  }

}

export default createOrUpdate
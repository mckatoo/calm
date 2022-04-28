import { NextApiRequest, NextApiResponse } from 'next'

import { encrypt } from '../../../lib/cryptograph'
import { prisma } from '../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    email,
    binanceKey,
    binanceSecret
  } = req.body

  if (!binanceKey) return res.status(400).json({ error: "Api Key required" })

  const { id: userId } = await prisma.user.findUnique({ where: { email } })

  const exchanges = await prisma.exchanges.findFirst({
    where: {
      AND: [{ userId, name: 'binance' }]
    }
  })

  const apiKey = encrypt(binanceKey)
  const secretKey = encrypt(binanceSecret)

  if (!exchanges) {
    await prisma.exchanges.create({
      data: {
        userId,
        name: 'binance',
        apiKey,
        secretKey
      }
    })
    return res.status(201).json({})
  } else {
    await prisma.exchanges.update({
      where: { id: exchanges.id },
      data: {
        userId,
        name: 'binance',
        apiKey,
        secretKey
      }
    })

    return res.status(204).end()
  }

}

export default handler
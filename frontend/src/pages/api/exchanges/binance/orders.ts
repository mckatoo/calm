import { NextApiRequest, NextApiResponse } from 'next'

import { tradeList } from '../../../../lib/binance/orders'
import { prisma } from '../../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  const binanceExchange = await prisma.exchanges.findMany({
    where: {
      AND: [
        { name: 'binance' },
        { userId }
      ]
    }
  })

  const data = binanceExchange[0]

  if (!data) return res.status(200).json([])

  

  const orders = await tradeList(data.apiKey, data.secretKey, 'BTCUSDT')
  console.log('orders', orders)

  return res.status(200).json(orders)
}

export default handler

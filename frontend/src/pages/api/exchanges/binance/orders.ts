import { NextApiRequest, NextApiResponse } from 'next'

import { tradeList } from '../../../../lib/binance/orders'
import { remmapersOrders } from '../../../../lib/binance/remmapers/orders'
import { prisma } from '../../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, symbol } = req.body

  const ordersInBinance = await tradeList({userId, symbol})
  const remmapedOrders = await remmapersOrders(ordersInBinance)

  const ordersInDb = await prisma.binanceOrders.findMany({
    where: { userId }
  })

  if (ordersInDb.length === 0) {
    await prisma.binanceOrders.createMany({
      data: remmapedOrders.map(order => ({
        userId,
        ...order,
        time: new Date(order.time)
      }))
    })
  }

  return res.status(200).json(remmapedOrders)
}

export default handler

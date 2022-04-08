import { NextApiRequest, NextApiResponse } from 'next'

import { tradeList } from '../../../../lib/binance/orders'
import { RemmaperOrdersType, remmapersOrders } from '../../../../lib/binance/remmapers/orders'
import { prisma } from '../../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, symbol } = req.body

  const ordersInBinance = await tradeList({ userId, symbol })
  const remmapedOrders = await remmapersOrders(ordersInBinance)

  const ordersInDb = await prisma.binanceOrders.findMany({
    where: { userId }
  })

  let orders: RemmaperOrdersType[] = []

  if (ordersInDb.length === 0) {
    orders = remmapedOrders
  } else {
    orders = remmapedOrders.filter(order =>
      !ordersInDb.some(db => db.originalId === order.originalId)
    )
  }

  await prisma.binanceOrders.createMany({
    data: orders.map(order => ({
      userId,
      originalId: order.originalId,
      pair: order.pair,
      price: order.price,
      amount: order.amount,
      totalBuyed: order.totalBuyed,
      commission: order.commission,
      time: order.time
    }))
  })

  return res.status(200).json(remmapedOrders)
}

export default handler

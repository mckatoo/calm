import { RawAccountTrade } from 'binance'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { remmapersOrders } from '../../../../lib/binance/remmapers/orders'
import { prisma } from '../../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, symbol } = req.body

  const token = await getToken({
    req,
    secret: process.env.SECRET
  })

  if (!token || (token.email !== email)) return res.status(401).json({ message: "Auth required." })

  const { id: userId } = await prisma.user.findUnique({
    where: { email }
  })

  let ordersInDb: RawAccountTrade[] = []

  if (!symbol) {
    ordersInDb = (await prisma.binanceOrders.findMany({
      where: { userId }
    })).map((order) => {
      return {
        id: parseInt(order.id),
        symbol: order.pair,
        orderId: parseInt(order.originalId),
        orderListId: 0,
        qty: parseFloat(order.amount.toFixed(8)),
        quoteQty: parseFloat(order.amount.toFixed(8)),
        price: parseFloat(order.price.toFixed(8)),
        commission: parseFloat(order.commission.toFixed(8)),
        commissionAsset: order.commissionAsset,
        time: order.time.getTime(),
        isBuyer: false,
        isMaker: false,
        isBestMatch: false
      }
    })
  } else {
    ordersInDb = (await prisma.binanceOrders.findMany({
      where: { userId, pair: symbol }
    })).map((order) => {
      return {
        id: parseInt(order.id),
        symbol: order.pair,
        orderId: parseInt(order.originalId),
        orderListId: 0,
        qty: parseFloat(order.amount.toFixed(8)),
        quoteQty: parseFloat(order.amount.toFixed(8)),
        price: parseFloat(order.price.toFixed(8)),
        commission: parseFloat(order.commission.toFixed(8)),
        commissionAsset: order.commissionAsset,
        time: order.time.getTime(),
        isBuyer: false,
        isMaker: false,
        isBestMatch: false
      }
    })
  }

  const remmapedOrders = await remmapersOrders(ordersInDb)

  return res.status(200).json(remmapedOrders)
}

export default handler

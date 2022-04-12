import { RawAccountTrade } from 'binance'
import { NextApiRequest, NextApiResponse } from 'next'

import { RemmaperOrdersType, remmapersOrders } from '../../../../lib/binance/remmapers/orders'
import { getImage } from '../../../../lib/coinmarketcap'
import { prisma } from '../../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, symbol } = req.body

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

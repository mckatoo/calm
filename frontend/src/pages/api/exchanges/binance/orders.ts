import { RawAccountTrade } from 'binance'
import { NextApiRequest, NextApiResponse } from 'next'

import { tradeList } from '../../../../lib/binance/orders'
import { RemmaperOrdersType, remmapersOrders } from '../../../../lib/binance/remmapers/orders'
import { tradeFee } from '../../../../lib/binance/tradeFee'
import { prisma } from '../../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, symbol } = req.body

  const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  let ordersInBinance: RawAccountTrade[] = []

  if (!!symbol) {
    ordersInBinance = await tradeList({ userId, symbol })
  } else {
    const mySymbols = (await prisma.binanceAssets.findMany({ where: { userId } })).map(asset => asset.name)
    const feePairs = (await tradeFee({ userId })).map(fee => fee.symbol)

    let startPairs: string[] = []

    mySymbols.forEach(symbol => {
      startPairs = [
        ...startPairs,
        ...feePairs.filter(feePair => feePair.startsWith(symbol))
      ]
    })

    let myPairs: string[] = []

    mySymbols.forEach(symbol => {
      myPairs = [
        ...myPairs,
        ...startPairs.filter(pair => pair.endsWith(symbol))
      ]
    })

    for (const pair of myPairs) {
      const trade = await tradeList({ userId, symbol: pair })
      ordersInBinance = [
        ...ordersInBinance,
        ...trade
      ]
      await timeout(1000)
    }
  }
  const remmapedOrders = await remmapersOrders(ordersInBinance)

  const ordersInDb = await prisma.binanceOrders.findMany({
    where: { userId }
  })

  const orders = remmapedOrders.filter(order =>
    !ordersInDb.some(db => db.originalId === order.originalId)
  )

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

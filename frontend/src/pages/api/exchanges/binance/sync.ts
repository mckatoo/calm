import { RawAccountTrade } from 'binance'
import { NextApiRequest, NextApiResponse } from 'next'
import { balances } from '../../../../lib/binance/balances'
import { tradeList } from '../../../../lib/binance/orders'
import { remmaperBalances, RemmaperBalancesType } from '../../../../lib/binance/remmapers/balances'
import { remmapersOrders } from '../../../../lib/binance/remmapers/orders'
import { tradeFee } from '../../../../lib/binance/tradeFee'
import { prisma } from '../../../../lib/prisma'
import timeout from '../../../../lib/timeout'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  // sync balance

  const binanceAssets = await prisma.binanceAssets.findMany({
    where: { userId }
  })

  const moreThanZero = await balances(userId)

  const remmapedBalances = await remmaperBalances(moreThanZero)

  let myBalances: RemmaperBalancesType[] = []

  if (binanceAssets.length === 0) {
    myBalances = remmapedBalances
  } else {
    myBalances = remmapedBalances.filter(balance =>
      !binanceAssets.some(asset =>
        asset.name === balance.name && asset.amount.toNumber() === balance.amount
      )
    )
  }

  await prisma.binanceAssets.createMany({
    data: myBalances.map(asset => ({
      userId,
      name: asset.name,
      amount: asset.amount,
      averagePrice: asset.averagePrice
    }))
  })

  // sync orders

  let ordersInBinance: RawAccountTrade[] = []

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
      commissionAsset: order.commissionAsset,
      time: order.time
    }))
  })

  return res.status(200).end()
}

export default handler

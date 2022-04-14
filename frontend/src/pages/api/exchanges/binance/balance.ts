import { NextApiRequest, NextApiResponse } from 'next'
import calcAveragePrice from '../../../../lib/binance/averagePrice/index'
import { remmaperBalances } from '../../../../lib/binance/remmapers/balances'
import { prisma } from '../../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  const dbAssets = await prisma.binanceAssets.findMany({
    where: { userId }
  })

  const dbOrders = (await prisma.binanceOrders.findMany({
    where: { userId },
    orderBy: { time: 'desc' }
  }))

  const remmapedBalances = await remmaperBalances(dbAssets.map(asset => {
    const orders = dbOrders.filter(order => order.pair.startsWith(asset.name)).map(order => ({
      price: order.price.toNumber(),
      commission: order.commission.toNumber(),
      qtd: order.amount.toNumber()
    }))

    return {
      coin: asset.name,
      free: asset.amount.toNumber(),
      averagePrice: calcAveragePrice({ balance: asset.amount.toNumber(), orders })
    }
  }))

  return res.status(200).json(remmapedBalances)
}

export default handler

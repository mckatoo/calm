import { NextApiRequest, NextApiResponse } from 'next'

import { remmaperBalances } from '../../../../lib/binance/remmapers/balances'
import { prisma } from '../../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  const dbAssets = await prisma.binanceAssets.findMany({
    where: { userId }
  })

  const remmapedBalances = await remmaperBalances(dbAssets.map(asset => ({
    coin: asset.name,
    free: asset.amount.toNumber(),
    averagePrice: asset.averagePrice.toNumber()
  })))

  return res.status(200).json(remmapedBalances)
}

export default handler

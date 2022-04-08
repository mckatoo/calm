import { NextApiRequest, NextApiResponse } from 'next'
import { balances } from '../../../../lib/binance/balances'
import { remmaperBalances, RemmaperBalancesType } from '../../../../lib/binance/remmapers/balances'
import { prisma } from '../../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

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
      !binanceAssets.some(asset => asset.name === balance.name)
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

  return res.status(200).json(remmapedBalances)
}

export default handler

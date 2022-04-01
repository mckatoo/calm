import { NextApiRequest, NextApiResponse } from 'next'
import { balances } from '../../../../lib/binance/balances'
import { remmaperBalances } from '../../../../lib/binance/remmapers/balances'
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
  
  const binanceAssets = await prisma.binanceAssets.findMany({
    where: { userId }
  })

  const moreThanZero = await balances(data.apiKey, data.secretKey)

  const remmapedBalances = await remmaperBalances(moreThanZero)

  if (binanceAssets.length === 0)
    await prisma.binanceAssets.createMany({
      data: remmapedBalances.map(asset => ({
        userId,
        ...asset
      }))
    })

  return res.status(200).json(remmapedBalances)
}

export default handler

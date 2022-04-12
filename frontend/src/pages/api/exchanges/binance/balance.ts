import { NextApiRequest, NextApiResponse } from 'next'
import { PortifolioItemProps } from '../../../../components/PortifolioItem'
import { balances } from '../../../../lib/binance/balances'
import { remmaperBalances, RemmaperBalancesType } from '../../../../lib/binance/remmapers/balances'
import { getImage } from '../../../../lib/coinmarketcap'
import { prisma } from '../../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body

  const binanceAssets = await prisma.binanceAssets.findMany({
    where: { userId }
  })

  const remmapedBalances = await remmaperBalances(binanceAssets.map(asset => ({
    coin: asset.name,
    free: asset.amount.toNumber(),
    locked: 0
  })))

  return res.status(200).json(remmapedBalances)
}

export default handler

import { MainClient } from 'binance'
import { NextApiRequest, NextApiResponse } from 'next'

import { PortifolioItemProps } from '../../../../components/PortifolioItem'
import { decrypt } from '../../../../lib/cryptograph'
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

  const api_key = decrypt(data.apiKey)
  const api_secret = decrypt(data.secretKey)

  const client = new MainClient({
    api_key,
    api_secret
  })

  await client.syncTime()

  const balances = await client.getBalances()
  const moreThanZero = balances.filter(assetBal =>
    assetBal.free !== '0'
    || assetBal.locked !== '0'
  );

  const getImage = async (symbol: string) => {
    const coinMarketCapResponse = await fetch(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${symbol}`, {
      method: 'GET',
      headers: { 'X-CMC_PRO_API_KEY': 'c53786fe-6fc5-4043-806e-fb9ad57546e1' }
    })
    const image = String((await coinMarketCapResponse.json()).data[symbol][0].logo)

    return image
  }

  const remmapedBalances: PortifolioItemProps[] = await Promise.all(moreThanZero.map(async assetBal => {
    const free = parseFloat(assetBal.free.toString())
    const locked = parseFloat(assetBal.locked.toString())
    const quantity = parseFloat((free + locked).toFixed(8))

    const image = !!(assetBal.coin === 'BRL') ? '/images/brazilian-real.svg' : await getImage(assetBal.coin)

    return {
      name: assetBal.coin,
      image,
      quantity,
      price: 0,
      averagePrice: 0,
      roi: 0,
    }
  }))

  return res.status(200).json(remmapedBalances)
}

export default handler
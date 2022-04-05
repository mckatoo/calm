import { MainClient } from 'binance'
import { decrypt } from '../cryptograph'
import { keys } from './keys'

type TradeListType = {
  userId: string
  symbol: string
}

const tradeList = async ({ userId, symbol }: TradeListType) => {

  const { apiKey, secretKey } = await keys(userId)

  const api_key = decrypt(apiKey)
  const api_secret = decrypt(secretKey)

  const client = new MainClient({
    api_key,
    api_secret
  })

  await client.syncTime()

  const tradeList = await client.getAccountTradeList({ symbol })

  return tradeList
}

export { tradeList }

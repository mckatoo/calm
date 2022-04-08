import { MainClient, RawAccountTrade } from 'binance'
import { decrypt } from '../cryptograph'
import { prisma } from '../prisma'
import { keys } from './keys'

type TradeListType = {
  userId: string
}

const tradeFee = async ({ userId }: TradeListType) => {

  const { apiKey, secretKey } = await keys(userId)

  const api_key = decrypt(apiKey)
  const api_secret = decrypt(secretKey)

  const client = new MainClient({
    api_key,
    api_secret
  })

  await client.syncTime()

  return await client.getTradeFee()
}
export { tradeFee }

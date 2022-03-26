import { MainClient } from 'binance'

import { decrypt } from '../cryptograph'

const tradeList = async (encryptedApiKey: string, encryptedSecretKey: string, symbol: string) => {
  const api_key = decrypt(encryptedApiKey)
  const api_secret = decrypt(encryptedSecretKey)

  const client = new MainClient({
    api_key,
    api_secret
  })

  await client.syncTime()

  const tradeList = await client.getAccountTradeList({ symbol })

  return tradeList
}

export { tradeList }
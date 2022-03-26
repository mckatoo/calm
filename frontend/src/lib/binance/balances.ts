import { MainClient } from 'binance'

import { decrypt } from '../cryptograph'

const balances = async (encryptedApiKey: string, encryptedSecretKey: string) => {
  const api_key = decrypt(encryptedApiKey)
  const api_secret = decrypt(encryptedSecretKey)

  const client = new MainClient({
    api_key,
    api_secret
  })

  await client.syncTime()

  const balances = await client.getBalances()
  const moreThanZero = balances.filter(assetBal =>
    assetBal.free !== '0'
    || assetBal.locked !== '0'
  )

  return moreThanZero
}

export { balances }
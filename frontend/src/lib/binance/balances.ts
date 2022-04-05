import { MainClient } from 'binance'
import { decrypt } from '../cryptograph'
import { keys } from './keys'

const balances = async (userId: string) => {
  const { apiKey, secretKey } = await keys(userId)

  const api_key = decrypt(apiKey)
  const api_secret = decrypt(secretKey)

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

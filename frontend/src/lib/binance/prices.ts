import { MainClient } from 'binance'

const prices = async (symbol?: string) => {
  const client = new MainClient()
  await client.syncTime()

  const price = !!symbol
    ? await client.getSymbolPriceTicker({ symbol })
    : await client.getSymbolPriceTicker()

  return price
}

export { prices }

import { AllCoinsInformationResponse } from "binance"
import { PortifolioItemProps } from "../../../components/PortifolioItem"
import { getImage } from "../../coinmarketcap"

const remmaperBalances = async (balance: AllCoinsInformationResponse[]) => {
  return await Promise.all(
    balance.map(async assetBal => {
      const free = parseFloat(assetBal.free.toString())
      const locked = parseFloat(assetBal.locked.toString())
      const amount = parseFloat((free + locked).toFixed(8))

      const image = !!(assetBal.coin === 'BRL') ? '/images/brazilian-real.svg' : await getImage(assetBal.coin)

      return {
        name: assetBal.coin,
        amount,
        averagePrice: 0,
        price: 0,
        roi: 0,
        image,
      }
    })
  )
}

export { remmaperBalances }
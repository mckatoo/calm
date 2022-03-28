import { AllCoinsInformationResponse } from "binance"
import { PortifolioItemProps } from "../../../components/PortifolioItem"
import { getImage } from "../../coinmarketcap"

const remmaperBalances = async (balance: AllCoinsInformationResponse[]) => {
  return await Promise.all(
    balance.map(async assetBal => {
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
    })
  )
}

export { remmaperBalances }
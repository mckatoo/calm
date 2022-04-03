import { AllCoinsInformationResponse } from "binance"
import { PortifolioItemProps } from "../../../components/PortifolioItem"
import { getImage } from "../../coinmarketcap"

type BalanceWithoutId = Omit<PortifolioItemProps, 'id' | 'price' | 'roi'>

export type RemmaperBalancesType = Required<BalanceWithoutId> & { userId?: string }

const remmaperBalances =
  async (balance: AllCoinsInformationResponse[]): Promise<RemmaperBalancesType[]> => {
    return await Promise.all(
      balance.map(async assetBal => {
        const free = parseFloat(assetBal.free.toString())
        const locked = parseFloat(assetBal.locked.toString())
        const amount = parseFloat((free + locked).toFixed(8))

        const image = !!(assetBal.coin === 'BRL') ? '/images/brazilian-real.svg' : await getImage(assetBal.coin)

        return {
          name: assetBal.coin,
          image,
          amount,
          averagePrice: 0,
        }
      })
    )
  }

export { remmaperBalances }

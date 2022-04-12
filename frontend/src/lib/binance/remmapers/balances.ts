import { AllCoinsInformationResponse } from "binance"
import { PortifolioItemProps } from "../../../components/PortifolioItem"
import { getImage } from "../../coinmarketcap"
import { prices } from "../prices"

type BalanceWithoutId = Omit<PortifolioItemProps, 'id' | 'roi'>

export type RemmaperBalancesType = Required<BalanceWithoutId> & { userId?: string }

type RemmaperBalancesInput = Pick<AllCoinsInformationResponse, 'coin' | 'free' | 'locked'>

const remmaperBalances =
  async (balance: RemmaperBalancesInput[]): Promise<RemmaperBalancesType[]> => {
    const pricesNow = await prices()

    return await Promise.all(
      balance.map(async assetBal => {
        const free = parseFloat(assetBal.free.toString())
        const locked = parseFloat(assetBal.locked.toString())
        const amount = parseFloat((free + locked).toString())

        const image = await getImage(assetBal.coin)

        const price = !!(assetBal.coin === 'USDT')
          ? 1
          : parseFloat(
            (
              Array.isArray(pricesNow)
              && pricesNow.find(
                p => p.symbol === `USDT${assetBal.coin}`
                  || p.symbol === `${assetBal.coin}USDT`
              )
            )?.price?.toString()
          )

        return {
          name: assetBal.coin,
          image,
          amount,
          price,
          averagePrice: 0,
        }
      })
    )
  }

export { remmaperBalances }

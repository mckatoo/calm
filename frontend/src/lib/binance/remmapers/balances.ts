import { AllCoinsInformationResponse } from "binance"
import { PortifolioItemProps } from "../../../components/PortifolioItem"
import { getImage } from "../../coinmarketcap"
import { fixedParseFloat } from "../../math/fixedParseFloat"
import { prices } from "../prices"

type BalanceWithoutId = Omit<PortifolioItemProps, 'id' | 'roi'>

export type RemmaperBalancesType = Required<BalanceWithoutId> & { userId?: string }

const remmaperBalances =
  async (balance: AllCoinsInformationResponse[]): Promise<RemmaperBalancesType[]> => {
    const pricesNow = await prices()

    return await Promise.all(
      balance.map(async assetBal => {
        const free = parseFloat(assetBal.free.toString())
        const locked = parseFloat(assetBal.locked.toString())
        const amount = fixedParseFloat((free + locked).toString())

        const image = !!(assetBal.coin === 'BRL') ? '/images/brazilian-real.svg' : await getImage(assetBal.coin)

        const price = !!(assetBal.coin === 'USDT')
          ? 1
          : fixedParseFloat(
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

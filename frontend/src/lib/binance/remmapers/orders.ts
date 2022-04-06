import { RawAccountTrade } from 'binance'
import { getImage } from '../../coinmarketcap'

export type RemmaperOrdersType = {
  originalId: string
  pair: string
  price: number
  amount: number
  totalBuyed: number
  commission: number
  time: Date
  icon: string
}

const remmapersOrders =
  async (orders: RawAccountTrade[]): Promise<RemmaperOrdersType[]> => {
    return await Promise.all(

      orders.map(async order => {
        const {
          id,
          symbol: pair,
          qty,
          time,
          price,
          quoteQty,
          commission,
          commissionAsset // verify if is base. If not, do convertion of the commission to base
        } = order

        return {
          originalId: `${id}`,
          pair,
          price: parseFloat(price.toString()),
          amount: parseFloat(qty.toString()),
          totalBuyed: parseFloat(quoteQty.toString()),
          commission: parseFloat(commission.toString()),
          time: new Date(time),
          icon: await getImage(
            pair.startsWith(commissionAsset)
              ? commissionAsset
              : pair.substring(0, 3) || pair.substring(0, 4)
          )
        }
      })
    )
  }

export { remmapersOrders }
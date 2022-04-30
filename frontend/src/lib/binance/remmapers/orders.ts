import { RawAccountTrade } from 'binance'
import { getImage } from '../../coinmarketcap'

export type RemmaperOrdersType = {
  originalId: string
  pair: string
  price: number
  amount: number
  totalBuyed: number
  commission: number
  commissionAsset: string
  time: Date
  icon: string
}

const remmapersOrders =
  async (orders: RawAccountTrade[]): Promise<RemmaperOrdersType[]> => await Promise.all(
    orders
      .sort((a, b) => b.time - a.time)
      .map(async order => {
        const {
          id,
          symbol: pair,
          qty,
          time,
          price,
          quoteQty,
          commission,
          commissionAsset
        } = order

        const icon = 'https://ik.imagekit.io/povo8thngv/calm/system/not-found.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1651240746571'
        // const icon = await getImage(
        //   pair.startsWith(commissionAsset)
        //     ? commissionAsset
        //     : pair.substring(0, 3) || pair.substring(0, 4)
        // )

        return {
          originalId: `${id}`,
          pair,
          price: parseFloat(price.toString()),
          amount: parseFloat(qty.toString()),
          totalBuyed: parseFloat(quoteQty.toString()),
          commission: parseFloat(commission.toString()),
          commissionAsset,
          time: new Date(time),
          icon
        }
      })
  )


export { remmapersOrders }
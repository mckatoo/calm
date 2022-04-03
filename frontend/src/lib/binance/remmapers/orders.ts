import { RawAccountTrade } from 'binance'

export type RemmaperOrdersType = {
  pair: string
  price: number
  amount: number
  totalBuyed: number
  commission: number
  time: number
}

const remmapersOrders =
  async (orders: RawAccountTrade[]): Promise<RemmaperOrdersType[]> => {
    return await Promise.all(

      orders.map(async order => {
        const {
          symbol: pair,
          qty,
          time,
          price,
          quoteQty,
          commission,
          commissionAsset // verify if is base. If not, do convertion of the commission to base
        } = order

        return {
          pair,
          price: parseFloat(price.toString()),
          amount: parseFloat(qty.toString()),
          totalBuyed: parseFloat(quoteQty.toString()),
          commission: parseFloat(commission.toString()),
          time,
        }
      })
    )
  }

export { remmapersOrders }
import { averagePrice, Order } from "../../math/averagePrice"

type CalcAveragePriceType = {
  balance: number
  orders: Order[]
}

const calcAveragePrice = ({ balance, orders }: CalcAveragePriceType) => {
  let filteredOrders: Order[] = []
  let currentBalance = 0

  for (const order of orders) {
    if (currentBalance + ((order.price * order.qtd) + order.commission) < balance) {
      filteredOrders.push(order)
      currentBalance += (order.price * order.qtd) + order.commission
    } else {
      filteredOrders.push({
        price: order.price,
        commission: order.commission,
        qtd: parseFloat(((balance - currentBalance - order.commission) / order.price).toFixed(8))
      })
      break
    }
  }

  const average = averagePrice(filteredOrders)

  return average
}

export default calcAveragePrice

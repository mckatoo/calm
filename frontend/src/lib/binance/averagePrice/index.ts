import { averagePrice, Order } from "../../math/averagePrice"

type CalcAveragePriceType = {
  balance: number
  orders: Order[]
}

const calcAveragePrice = ({ balance, orders }: CalcAveragePriceType) => {
  let filteredOrders: Order[] = []
  let currentBalance = 0

  for (const order of orders) {
    if ((currentBalance + order.qtd) <= balance) {
      filteredOrders.push(order)
      currentBalance += order.qtd
    } else {
      break
    }
  }

  const average = averagePrice(filteredOrders)

  return average
}

export default calcAveragePrice

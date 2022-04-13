import { sum } from "./sum"

type Order = {
  price: number
  commission: number
  qtd: number
}

export const averagePrice = (orders: Order[]): number => {
  const qtd = sum(orders.map(order => order.qtd))
  const ordersValue = sum(orders.map(order => ((order.price * order.qtd) + order.commission)))

  const average = parseFloat((ordersValue / qtd).toFixed(8))

  return average
}
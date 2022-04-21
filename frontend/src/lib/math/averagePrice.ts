import { sum } from "./sum"

export type Order = {
  price: number
  commission: number
  qtd: number
}

export const averagePrice = (orders: Order[]): number => {
  const totalQtd = sum(orders.map(order => order.qtd))
  const ordersValue = sum(orders.map(order => ((order.price * order.qtd) + order.commission)))

  const average = parseFloat((ordersValue / totalQtd).toFixed(8))

  return average
}

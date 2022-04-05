import { prisma } from "../prisma"

export const keys = async (userId: string) => {
  const binanceExchange = await prisma.exchanges.findFirst({
    where: {
      AND: [
        { name: 'binance' },
        { userId }
      ]
    }
  })

  return binanceExchange
}
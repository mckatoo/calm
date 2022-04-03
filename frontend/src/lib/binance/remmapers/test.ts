import { AllCoinsInformationResponse } from "binance"
import { remmaperBalances } from "./balances"

jest.mock('../../coinmarketcap')

describe('Remmapers', () => {
  it('should input original balance and output an Promisse of RemmaperBalancesType', async () => {
    const input = [
      {
        coin: "BNB",
        name: "BNB",
        free: "0.03459873",
        locked: "0",
      },
      {
        coin: "BRL",
        name: "BRL",
        free: "0.03628627",
        locked: "0",
      },
    ]

    const output = await remmaperBalances(input as AllCoinsInformationResponse[])

    expect(output).toStrictEqual([
      {
        name: input[0].name,
        image: undefined,
        amount: parseFloat(input[0].free) + parseFloat(input[0].locked),
        price: 0,
        averagePrice: 0,
        roi: 0
      },
      {
        name: input[1].name,
        image: '/images/brazilian-real.svg',
        amount: parseFloat(input[1].free) + parseFloat(input[1].locked),
        price: 0,
        averagePrice: 0,
        roi: 0
      }
    ])
  })
})

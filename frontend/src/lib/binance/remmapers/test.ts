import { RawAccountTrade } from 'binance'

import { remmaperBalances } from './balances'
import { mockInputBalances, mockOutputBalances } from './balancesMock'
import { remmapersOrders } from './orders'
import { mockInputOrders, mockOutputOrders } from './ordersMock'

jest.mock('../../coinmarketcap')
jest.mock("../prices")

describe('Remmapers', () => {
  it('Should input original balance and output an Promisse of RemmaperBalancesType', async () => {
    const input = mockInputBalances
    const output = await remmaperBalances(input)

    expect(output).toStrictEqual(mockOutputBalances)
  })

  it('Should input original balance and output an Promisse of RemmaperBalancesType', async () => {
    const input = mockInputOrders
    const output = await remmapersOrders(input as RawAccountTrade[])

    expect(output).toStrictEqual(mockOutputOrders)
  })

})

import calcAveragePrice from "."
import { } from "../../math/mockOrders"
import { mockBalance, mockDbOrders, mockExpectedAverage } from "./mock"

describe('Average Price in of the orders on db', () => {
  it('should return average price', () => {
    const average = calcAveragePrice({ balance: mockBalance, orders: mockDbOrders })

    expect(average).toBe(mockExpectedAverage)
  })
})
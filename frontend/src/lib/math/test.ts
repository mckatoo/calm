import { subtract, sum } from "."
import { averagePrice } from "./averagePrice"
import { mockExpectedAverage, mockAveragePrice } from "./mockOrders"

describe('Math library', () => {

  it('should sum array positive values', () => {
    const values = [1, 2, 3, 4, 5]
    const sumValues = sum(values)

    expect(sumValues).toBe(15)
  })

  it('should sum array negative values', () => {
    const values = [-1, -2, -3, -4, -5]
    const sumValues = sum(values)

    expect(sumValues).toBe(-15)
  })

  it('should sum array positive and negative values', () => {
    const values = [-1, 2, -3, 4, -5]
    const sumValues = sum(values)
    expect(sumValues).toBe(-3)

    const invertedValues = [1, -2, 3, -4, 5]
    const sumInvertedValues = sum(invertedValues)
    expect(sumInvertedValues).toBe(3)

    const randomValues = [34, -543, -4, 2354, -5]
    const sumRandomValues = sum(randomValues)
    expect(sumRandomValues).toBe(1836)
  })

  it('should subtract array values', () => {
    const values = [1, 2, 3, 4, 5]
    const subtractValues = subtract(values)

    expect(subtractValues).toBe(-13)
  })

  it('should subtract array negative values', () => {
    const values = [-1, -2, -3, -4, -5]
    const subtractValues = subtract(values)

    expect(subtractValues).toBe(13)
  })

  it('should subtract array positive and negative values', () => {
    const values = [-1, 2, -3, 4, -5]
    const subtractValues = subtract(values)
    expect(subtractValues).toBe(1)

    const invertedValues = [1, -2, 3, -4, 5]
    const subtractInvertedValues = subtract(invertedValues)
    expect(subtractInvertedValues).toBe(-1)

    const randomValues = [34, -543, -4, 2354, -5]
    const subtractRandomValues = subtract(randomValues)
    expect(subtractRandomValues).toBe(-1768)
  })

  it('should return average price', () => {
    const orders = mockAveragePrice
    const average = averagePrice(orders)
    
    expect(average).toBe(mockExpectedAverage)
  })
})

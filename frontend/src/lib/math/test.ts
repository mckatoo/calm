import { substract, sum } from ".";

describe('Math library', () => {

  it('should sum array positive values', () => {
    const values = [1, 2, 3, 4, 5];
    const sumValues = sum(values);

    expect(sumValues).toBe(15);
  });

  it('should sum array negative values', () => {
    const values = [-1, -2, -3, -4, -5];
    const sumValues = sum(values);

    expect(sumValues).toBe(-15);
  });

  it('should sum array positive and negative values', () => {
    const values = [-1, 2, -3, 4, -5];
    const sumValues = sum(values);
    expect(sumValues).toBe(-3);

    const invertedValues = [1, -2, 3, -4, 5];
    const sumInvertedValues = sum(invertedValues);
    expect(sumInvertedValues).toBe(3);

    const randomValues = [34, -543, -4, 2354, -5];
    const sumRandomValues = sum(randomValues);
    expect(sumRandomValues).toBe(1836);
  });

  it('should substract array values', () => {
    const values = [1, 2, 3, 4, 5];
    const substractValues = substract(values);

    expect(substractValues).toBe(-13);
  })

  it('should substract array negative values', () => {
    const values = [-1, -2, -3, -4, -5];
    const substractValues = substract(values);

    expect(substractValues).toBe(13);
  });

  it('should substract array positive and negative values', () => {
    const values = [-1, 2, -3, 4, -5];
    const substractValues = substract(values);
    expect(substractValues).toBe(1);

    const invertedValues = [1, -2, 3, -4, 5];
    const substractInvertedValues = substract(invertedValues);
    expect(substractInvertedValues).toBe(-1);

    const randomValues = [34, -543, -4, 2354, -5];
    const substractRandomValues = substract(randomValues);
    expect(substractRandomValues).toBe(-1768);
  });
});
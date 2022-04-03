export const subtract = (values: number[]): number => {
  let result = values[0]
  for (let index = 1; index < values.length; index++) {
    result -= values[index]
  }

  return result
}

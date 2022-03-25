const sum = (values: number[]): number =>
  values.reduce((accumulator, curr) => accumulator + curr, 0)

const substract = (values: number[]): number =>{
  let result = values[0]
  for (let index = 1; index < values.length; index++) {
    result -= values[index]
  }
  
  return result
}

export {
  sum,
  substract
}
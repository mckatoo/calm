export const fixedParseFloat = (value: string): number => {
  const parsed = parseFloat(value)

  return parseFloat(parsed.toFixed(8))
}
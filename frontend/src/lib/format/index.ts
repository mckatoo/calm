export const formatPrice = (price: number | bigint): string => {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

type FormatTimeType = {
  time: number | string | Date,
  locale?: 'en-US' | 'pt-BR',
  options?: Intl.DateTimeFormatOptions
}

export const formatTime = ({
  time,
  locale = 'pt-BR',
  options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }
}: FormatTimeType) => {
  const validTime = typeof (time) === 'number' ? time : new Date(time).getTime()

  return new Intl.DateTimeFormat(locale, options).format(validTime)
}

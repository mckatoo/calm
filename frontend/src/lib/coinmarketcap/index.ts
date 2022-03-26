const getImage = async (symbol: string) => {
  const coinMarketCapResponse = await fetch(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${symbol}`, {
    method: 'GET',
    headers: { 'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_KEY }
  })
  const image = String((await coinMarketCapResponse.json()).data[symbol][0].logo)

  return image
}

export {
  getImage
}


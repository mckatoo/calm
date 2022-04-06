import fs from 'fs'
import { image as downloadImage } from 'image-downloader'
import { resolve } from 'path'

async function download(url: string, symbol: string) {
  console.log(`Downloading the image ${symbol}...`)

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_KEY }
  })
  const data = (await response.json()).data
  const newUrl = data[symbol] ? data[symbol][0].logo : ''
  const dest = `../../public/images/symbols/${symbol}.png`

  await downloadImage({
    url: newUrl,
    dest
  })
}

const getImage = async (symbol: string) => {
  const image = `/images/symbols/${symbol}.png`
  const fileExist = fs.existsSync(`public/${image}`)

  if (!fileExist) await download(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${symbol}`, symbol)

  return image
}

export {
  getImage
}

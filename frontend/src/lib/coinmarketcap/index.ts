// import ImageKit from 'imagekit'

import { getImageUrl } from "../imagekit"

// type GetSymbolUrlProps = {
//   url: string
//   symbol: string
// }

// const getSymbolUrl = async ({ url, symbol }: GetSymbolUrlProps) => {
//   console.log(`Downloading the image ${symbol}...`)

//   const response = await fetch(url, {
//     method: 'GET',
//     headers: { 'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_KEY }
//   })

//   if (!response.ok) {
//     const data = await response.json()
//     if (!data[symbol] && data.status.error_message) {
//       console.log('Error:', data.status.error_message)
//       return ''
//     }
//     const image = data[symbol][0]
//     const logo = `${image.logo}`
//     return logo
//   }

//   return ''
// }

// type UploadProps = {
//   url: string
//   symbol: string
//   folder: string
// }

// const imagekit = new ImageKit(
//   {
//     publicKey: `${process.env.IMAGEKIT_PUBLIC_KEY}`,
//     privateKey: `${process.env.IMAGEKIT_PRIVATE_KEY}`,
//     urlEndpoint: `${process.env.IMAGEKIT_URL_ENDPOINT}`
//   }
// )

// const uploadSymbol = async ({ url, symbol, folder }: UploadProps) => {
//   const file = await getSymbolUrl({ url, symbol })

//   if (!!file) {
//     const uploadResponse = await imagekit.upload({
//       file,
//       fileName: `${symbol}.png`,
//       folder,
//       useUniqueFileName: false
//     })

//     return uploadResponse.url
//   }

//   return
// }

// type UrlProps = {
//   filename: string
//   path: string
// }

// const getImageUrl = async ({ filename, path }: UrlProps) => {
//   const imageURL = imagekit.url({
//     path: `${path}${filename}`,
//   })
//   const response = await fetch(imageURL, {
//     method: 'GET'
//   })

//   return response.ok ? imageURL : null
// }

// const getImage = async (symbol: string, fileExtension?: string) => {
//   const image = !!(symbol === 'BRL')
//     ? await getImageUrl({ filename: 'brazilian-real.svg', path: '/calm/symbols/' })
//     : !!(symbol === 'USD')
//       ? await getImageUrl({ filename: 'dollar.svg', path: '/calm/symbols/' })
//       : await getImageUrl({ filename: `${symbol}.${fileExtension}`, path: '/calm/symbols/' })

//   if (!image) {
//     const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${symbol}`
//     const newImageUrl = await uploadSymbol({
//       url,
//       symbol,
//       folder: '/calm/symbols/'
//     })

//     if (!newImageUrl) {
//       const notFoundImage = await getImageUrl({
//         filename: 'not-found.webp',
//         path: '/calm/system/'
//       })
//       return notFoundImage
//     }

//     return newImageUrl
//   }

//   return image
// }

const imageNotFound = async () => await getImageUrl({
  filename: 'not-found.webp',
  path: '/calm/system/'
})

const getImage = async (symbol: string) => {
  // console.log(`Downloading the image ${symbol}...`)
  // const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${symbol}`
  // const response = await fetch(url, {
  //   method: 'GET',
  //   headers: { 'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_KEY }
  // })
  // const data = (await response.json()).data

  // if (!data[symbol] && data.status.error_message) {
  //   console.log('Error:', data.status.error_message)
  //   return await imageNotFound()
  // }

  // const imageExist = await getImageUrl({
  //   filename: `${symbol}.png`,
  //   path: `/calm/symbols/`
  // })

  // if (!imageExist) return imageExist


  return await imageNotFound()
}

export {
  getImage
}

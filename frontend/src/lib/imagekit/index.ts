import ImageKit from 'imagekit'

const imagekit = new ImageKit(
  {
    publicKey: `${process.env.IMAGEKIT_PUBLIC_KEY}`,
    privateKey: `${process.env.IMAGEKIT_PRIVATE_KEY}`,
    urlEndpoint: `${process.env.IMAGEKIT_URL_ENDPOINT}`
  }
)

type UrlProps = {
  filename: string
  path: string
}

const getImageUrl = async ({ filename, path }: UrlProps) => {
  const imageURL = imagekit.url({
    path: `${path}${filename}`,
  })
  const response = await fetch(imageURL, {
    method: 'GET'
  })

  return response.ok ? imageURL : null
}

type UploadProps = {
  url: string
  folder: string
  fileName: string
}

const upload = async ({ url, folder, fileName }: UploadProps) => {
  const uploadResponse = await imagekit.upload({
    file: url,
    fileName,
    folder,
    useUniqueFileName: false
  })

  return uploadResponse.url
}

export {
  getImageUrl,
  upload
}
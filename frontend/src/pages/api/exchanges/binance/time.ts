import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import querystring from 'querystring'

// const apiSecret = 'Ta0tCCHRGmGaM0BxoluLGzNjVbq4VVfa2ueecDsT7NcNI52YvicCZnWjI5cLU9Ff'
// const apiKey = 'W2xUgoUyvU7fW67Eh9B3potI89J1KYFDKLASdj49JQwLfIMxdyHUb0lf3ojg27xu'

const balance = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = process.env.API_KEY
  const apiSecret = process.env.SECRET_KEY
  const timestamp = Date.now()
  const signature = crypto.createHmac('sha256', apiSecret)
    .update(`${querystring.stringify({ timestamp })}`)
    .digest('hex')

  const newData = { signature, timestamp }
  const qs = `?${querystring.stringify(newData)}`

  const result = await fetch(
    `https://api.binance.com/api/v3/account${qs}`,
    {
      method: 'GET',
      headers: { 'X-MBX-APIKEY': apiKey }
    }
  )

  const json = await result.json()

  return res.status(200).json(json)
}

export default balance
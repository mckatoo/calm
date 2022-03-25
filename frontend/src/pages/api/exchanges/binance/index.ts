import { NextApiRequest, NextApiResponse } from 'next'

const binance = async (req: NextApiRequest, res: NextApiResponse) => {
  const test = async () => await fetch('https://api.binance.com')
  if (!test) return res.status(500).json({ error: 'binance api is off' })

  return res.status(200).json({})
}

export default binance

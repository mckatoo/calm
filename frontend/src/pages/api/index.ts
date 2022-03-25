import { NextApiRequest, NextApiResponse } from "next"

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({status: "ok"})
}

export default handler
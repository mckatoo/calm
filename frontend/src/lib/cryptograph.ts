import { createCipher, createDecipher } from 'crypto'
import * as jwt from 'jsonwebtoken'

const INPUT_ENCODING = 'utf8'
const ALGORITHM = 'aes-256-ctr'
const OUTPUT_ENCODING = 'hex'
const KEY = process.env.CRYPTOGRAPH_KEY
// const IV = jwt.sign({ KEY }, process.env.NEXTAUTH_SECRET, {
//   expiresIn: 3600
// })

const encrypt = (value: string) => {
  const cipher = createCipher(ALGORITHM, KEY)
  let encrypted = cipher.update(value, INPUT_ENCODING, OUTPUT_ENCODING)

  return encrypted.toString()
}

const decrypt = (encrypted: string) => {
  const decipher = createDecipher(ALGORITHM, KEY)
  let decrypted = decipher.update(encrypted, OUTPUT_ENCODING, INPUT_ENCODING)

  return decrypted
}

export {
  encrypt,
  decrypt
}
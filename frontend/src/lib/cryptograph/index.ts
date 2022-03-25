import { createCipher, createCipheriv, createDecipher, createDecipheriv, randomBytes } from 'crypto'

const INPUT_ENCODING = 'utf8'
const ALGORITHM = 'aes-256-ctr'
const OUTPUT_ENCODING = 'hex'
const KEY = process.env.CRYPTOGRAPH_KEY.slice(0, 32)

const encrypt = (value: string) => {
  const iv = randomBytes(16)
  const cipher = createCipheriv(ALGORITHM, KEY, iv)
  let encrypted = cipher.update(value, INPUT_ENCODING, OUTPUT_ENCODING)
  encrypted += cipher.final(OUTPUT_ENCODING)

  return `${iv.toString(OUTPUT_ENCODING)}:${encrypted.toString()}`
}

const decrypt = (encrypted: string) => {
  const [iv, encryptedText] = encrypted.split(':')
  const decipher = createDecipheriv(ALGORITHM, KEY, Buffer.from(iv, OUTPUT_ENCODING))
  let decrypted = decipher.update(encryptedText, OUTPUT_ENCODING, INPUT_ENCODING)
  decrypted += decipher.final(INPUT_ENCODING)

  return decrypted
}

export {
  encrypt,
  decrypt
}
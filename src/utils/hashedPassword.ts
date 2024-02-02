import crypto from 'crypto'

export const createHashed = (string: string | undefined) => {
  if (string) {
    return crypto.createHash('sha512').update(string).digest('base64')
  }
  return ""
}

import crypto from 'crypto'

export default function generateRandomString(lentgh: number = 8): string {
    return crypto.randomBytes(lentgh).toString('hex')
}
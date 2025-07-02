import { v4 as uuid } from 'uuid'

export default function generateRandomString(length: number = 8): string {    
    return uuid().slice(0, length).toUpperCase()
}
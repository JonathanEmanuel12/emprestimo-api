export default function generateRandomNumber(max: number = 999, min: number = 100): number {
    return Math.ceil(Math.random() * (max - min) + min)
}
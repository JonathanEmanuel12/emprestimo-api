import type { MultipartFile } from '@adonisjs/core/bodyparser'
import { Disk } from '@adonisjs/drive'
import drive from '@adonisjs/drive/services/main'
import generateRandomNumber from '../utils/functions/generateRandomNumber.js'
import fs from "fs"

export default class FileService {
    private disk: Disk
    constructor() {
        this.disk = drive.use()
    }

    public async upload(file: MultipartFile, location: string, fileName: string): Promise<string> {
        const completeFileName = this.getCompleteFileName(fileName)
        // upload falso enquanto não há conta na aws
        return location + completeFileName
        const buffer = fs.readFileSync(file.tmpPath!)
        await this.disk.put(`${location}/${completeFileName}`, new Uint8Array(buffer))
        return await this.disk.getUrl(`${location}/${completeFileName}`)
    }

    public async deleteFileFromDrive(location: string, completeFileName: string): Promise<void> {
        await this.disk.delete(`${location}/${completeFileName}`)
    }

    private getCompleteFileName(fileName: string): string {
        const randomPrefix = generateRandomNumber(999, 100).toString() + '-'
        return randomPrefix + fileName
    }
}
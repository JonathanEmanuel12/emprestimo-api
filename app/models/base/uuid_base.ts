import { beforeCreate, column } from '@adonisjs/lucid/orm'
import TimestampBase from './timestamp_base.js'
import { v4 } from 'uuid'

export default class UuidBase extends TimestampBase {
    public static selfAssignPrimaryKey = true

    @column({ isPrimary: true })
    declare id: string
    
    @beforeCreate()
    public static assignUuid(uuidBase: UuidBase): void {
        uuidBase.id = v4() 
    }
}
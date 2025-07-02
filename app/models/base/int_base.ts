import { column } from '@adonisjs/lucid/orm'
import TimestampBase from './timestamp_base.js'

export default class IntBase extends TimestampBase {
    @column({ isPrimary: true })
    declare id: number
}
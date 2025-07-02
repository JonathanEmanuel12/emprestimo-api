import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Client from './client.js'
import IntBase from './base/int_base.js'

export default class ValidationCode extends IntBase {
    @column()
    declare code: string

    @column()
    declare wasUsed: boolean

    @column()
    declare clientId: string

    @belongsTo(() => Client)
    declare client: BelongsTo<typeof Client>
}
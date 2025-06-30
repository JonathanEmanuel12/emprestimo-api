import UuidBase from './base/uuid_base.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import Client from './client.js'

export default class Address extends UuidBase {
    @column()
    declare cep: string

    @column()
    declare state: string

    @column()
    declare city: string

    @column()
    declare neighborhood: string

    @column()
    declare street: string

    @column()
    declare number: string

    @column()
    declare complement: string

    @column()
    declare clientId: string

    @belongsTo(() => Client)
    declare client: BelongsTo<typeof Client>
}
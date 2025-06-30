import { belongsTo, column } from '@adonisjs/lucid/orm'
import UuidBase from './base/uuid_base.js'
import Client from './client.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Item extends UuidBase {
  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare observation: string

  @column()
  declare clientId: string

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>
}
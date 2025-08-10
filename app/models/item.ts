import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import UuidBase from './base/uuid_base.js'
import Client from './client.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Loan from './loan.js'

export default class Item extends UuidBase {
  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare observation: string

  @column()
  declare imgUrl: string

  //todo adicionar campo isAvailable

  @column()
  declare clientId: string

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @hasMany(() => Loan)
  declare loans: HasMany<typeof Loan>
}
import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import UuidBase from './base/uuid_base.js'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Item from './item.js'

export default class Client extends UuidBase {
  @column()
  declare name: string

  @column()
  declare userId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Item)
  declare items: HasMany<typeof Item>
}
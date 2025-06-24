import { belongsTo, column } from '@adonisjs/lucid/orm'
import UuidBase from './base/uuid_base.js'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Client extends UuidBase {
  @column()
  declare name: string

  @column()
  declare userId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
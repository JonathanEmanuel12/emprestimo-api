import { belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import UuidBase from './base/uuid_base.js'
import User from './user.js'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Item from './item.js'
import Address from './address.js'
import ValidationCode from './validation_code.js'

export default class Client extends UuidBase {
  @column()
  declare name: string

  @column()
  declare imgUrl: string

  @column()
  declare isVerified: boolean
  
  @column()
  declare userId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Item)
  declare items: HasMany<typeof Item>

  @hasMany(() => ValidationCode)
  declare validationCodes: HasMany<typeof ValidationCode>

  @hasOne(() => Address)
  declare address: HasOne<typeof Address>
}
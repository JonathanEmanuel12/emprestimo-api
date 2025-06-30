import { belongsTo, column } from '@adonisjs/lucid/orm'
import UuidBase from './base/uuid_base.js'
import { DateTime } from 'luxon'
import Item from './item.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Client from './client.js'
import { LoanStatus } from '../utils/enums.js'

export default class Loan extends UuidBase {
  @column.date()
  declare returnDeadline: DateTime

  @column.date()
  declare loanDate: DateTime

  @column()
  declare status: LoanStatus

  @column()
  declare itemId: string

  @column()
  declare clientId: string

  @belongsTo(() => Item)
  declare item: BelongsTo<typeof Item>

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>
}
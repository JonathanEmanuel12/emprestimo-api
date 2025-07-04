import { belongsTo, column } from '@adonisjs/lucid/orm'
import IntBase from './base/int_base.js'
import Address from './address.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Geolocation extends IntBase {   
    @column()
    declare latitude: string
    
    @column()
    declare longitude: string

    @column()
    declare addressId: string
    
    @belongsTo(() => Address)
    declare address: BelongsTo<typeof Address>   
}
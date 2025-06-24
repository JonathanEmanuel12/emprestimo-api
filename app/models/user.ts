import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { column, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { Roles } from '../utils/enums.js'
import UuidBase from './base/uuid_base.js'
import Client from './client.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
    uids: ['email'],
    passwordColumnName: 'password',
})

export default class User extends compose(UuidBase, AuthFinder) {
    @column()
    declare email: string

    @column({ serializeAs: null })
    declare password: string

    @column()
    declare role: Roles

    @hasOne(() => Client)
    declare client: HasOne<typeof Client>

    static accessTokens = DbAccessTokensProvider.forModel(User)
}
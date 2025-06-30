import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'addresses'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.string('cep').notNullable()
            table.string('state').notNullable()
            table.string('city').notNullable()
            table.string('neighborhood').notNullable()
            table.string('street').notNullable()
            table.string('number').notNullable()
            table.string('complement').nullable()

            table.uuid('client_id').references('id').inTable('clients').onDelete('CASCADE').notNullable()

            table.timestamp('created_at')
            table.timestamp('updated_at')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
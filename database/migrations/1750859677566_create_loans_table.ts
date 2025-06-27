import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'loans'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.date('loan_date').nullable()
            table.date('return_deadline').nullable()
            table.string('status').notNullable()

            table.uuid('item_id').references('id').inTable('items').onDelete('CASCADE').notNullable()
            table.uuid('client_id').references('id').inTable('clients').onDelete('CASCADE').notNullable()

            table.timestamp('created_at')
            table.timestamp('updated_at')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
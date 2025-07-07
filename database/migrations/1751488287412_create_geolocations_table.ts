import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'geolocations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('latitude')
      table.string('longitude')

      table.uuid('address_id').references('id').inTable('addresses').onDelete('CASCADE').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
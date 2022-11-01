exports.up = function (knex) {
  return knex.schema.createTable('lists', (table) => {
    table.increments('id')
    table.string('list_name')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('lists')
}

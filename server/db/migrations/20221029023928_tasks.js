exports.up = function (knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id')
    //if using postgres, the syntax changes here
    table.integer('lists_id').references('lists.id')
    table.string('name')
    table.string('description')
    table.datetime('deadline')
    table.string('status')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('tasks')
}

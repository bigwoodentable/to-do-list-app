/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('lists').del()
  await knex('lists').insert([
    { id: 1, list_name: 'Kitchen' },
    { id: 2, list_name: 'Groceries' },
    { id: 3, list_name: 'Gym' },
  ])
}

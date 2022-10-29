const connection = require('./connection')

const getTasksByListId = (listId, db = connection) => {
  return db('tasks')
    .where('lists_id', listId)
    .select('name', 'description', 'deadline')
}

module.exports = { getTasksByListId }

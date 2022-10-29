const connection = require('./connection')

const addTaskByListId = (task, db = connection) => {
  // Format dateTime when refactoring
  const taskFormatted = {
    lists_id: task.listId,
    name: task.name,
    description: task.description,
    deadline: task.deadline,
  }

  return db('tasks').insert(taskFormatted)
}

const getTasksByListId = (listId, db = connection) => {
  return db('tasks')
    .where('lists_id', listId)
    .select('name', 'description', 'deadline')
}

module.exports = { getTasksByListId, addTaskByListId }

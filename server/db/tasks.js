const connection = require('./connection')

const addTaskByListId = (task, db = connection) => {
  // Format dateTime when refactoring
  const taskFormatted = {
    lists_id: task.listId,
    name: task.name,
    description: task.description,
    deadline: task.deadline,
    status: 'incomplete',
  }

  return db('tasks').insert(taskFormatted)
}

const getTasksByListId = (listId, db = connection) => {
  return db('tasks')
    .where('lists_id', listId)
    .andWhere('status', 'incomplete')
    .select('id as taskId', 'name', 'description', 'deadline')
}

function delTaskByTaskId(taskId, db = connection) {
  return db('tasks').where('id', taskId).del()
}

function updateStatusByTaskId(taskId, db = connection) {
  return db('tasks').where('id', taskId).update('status', 'completed')
}

module.exports = {
  getTasksByListId,
  addTaskByListId,
  delTaskByTaskId,
  updateStatusByTaskId,
}

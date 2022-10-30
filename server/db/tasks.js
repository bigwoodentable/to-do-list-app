const connection = require('./connection')
const { DateTime } = require('luxon')

const addTaskByListId = (task, db = connection) => {
  // Format dateTime when refactoring, convert to UTC from local time
  const taskFormatted = {
    lists_id: task.listId,
    name: task.name,
    description: task.description,
    deadline: task.deadline,
    status: 'incomplete',
  }
  console.log('task.deadline', task.deadline)
  return db('tasks').insert(taskFormatted)
}

const getTasksByListId = (listId, db = connection) => {
  return db('tasks')
    .where('lists_id', listId)
    .andWhere('status', 'incomplete')
    .select('id as taskId', 'name', 'description', 'deadline')
}

const delTaskByTaskId = (taskId, db = connection) => {
  return db('tasks').where('id', taskId).del()
}

const delTaskByListId = (listId, db = connection) => {
  return db('tasks').where('lists_id', listId).del()
}

const updateStatusByTaskId = (taskId, db = connection) => {
  return db('tasks').where('id', taskId).update('status', 'completed')
}

const editTaskByTaskId = (task, db = connection) => {
  return db('tasks').where('id', task.taskId).update({
    name: task.name,
    description: task.description,
    deadline: task.deadline,
  })
}
const updateTaskListId = (taskId, listId, db = connection) => {
  return db('tasks').where('id', taskId).update('lists_id', listId)
}

const getTaskNameByTaskId = (taskId, db = connection) => {
  return db('tasks').where('id', taskId).select('name').first()
}

const getAllTasks = (db = connection) => {
  return db('tasks').select('id', 'deadline')
}

const checkLateTasks = async (db = connection) => {
  const deadline = await db('tasks').where('id', 1).select('deadline').first()
  const timeDiff = DateTime.fromISO('2022-11-10').diffNow()
  console.log(timeDiff.values)
  return null
}

// checkLateTasks()

module.exports = {
  getTasksByListId,
  addTaskByListId,
  delTaskByTaskId,
  updateStatusByTaskId,
  editTaskByTaskId,
  delTaskByListId,
  updateTaskListId,
  getTaskNameByTaskId,
  getAllTasks,
  checkLateTasks,
}

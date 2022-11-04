const connection = require('./connection')
const { ISOtoLocaleString, localToUTC } = require('./datetime-utils')

const getTaskByTaskId = (taskId, db = connection) => {
  return db('tasks').where('id', taskId).select().first()
}

//datetime saved as UTC
const addTask = async (task, db = connection) => {
  const taskFormatted = {
    lists_id: task.listId,
    name: task.name,
    description: task.description,
    deadline: task.deadline,
    status: 'incomplete',
  }
  const taskId = await db('tasks').insert(taskFormatted)
  return getTaskByTaskId(taskId[0], db)
}

const getTasksByListId = async (listId, db = connection) => {
  const tasks = await db('tasks')
    .where('lists_id', listId)
    .andWhere('status', 'incomplete')
    .select('id as taskId', 'name', 'description', 'deadline')
  return tasks.map((task) => {
    //returns datetime in a more readable format
    return task.deadline
      ? { ...task, deadline: ISOtoLocaleString(task.deadline) }
      : null
  })
}

const delTaskByTaskId = (taskId, db = connection) => {
  return db('tasks').where('id', taskId).del()
}

const delTaskByListId = (listId, db = connection) => {
  return db('tasks').where('lists_id', listId).del(['lists_id'])
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

// checks whether a task is late by comparing its deadline and the time now, if negative then deadline passed
// returns a string of late tasks e.g. 'Chop the carrot, Buy apple'
const checkLateTasks = async (db = connection) => {
  const allTasks = await db('tasks').select('id', 'deadline', 'name')
  const lateTasksPromises = allTasks.map(async (task) => {
    const deadline = await db('tasks')
      .where('id', task.id)
      .select('deadline')
      .first()
    const timeDiff = timeDiff(localToUTC(deadline.deadline))
    return timeDiff < 0 ? task.name : null
  })
  const lateTasks = await Promise.all(lateTasksPromises)
  const lateTasksRemoveNulls = lateTasks.filter((name) => name !== null)
  return lateTasksRemoveNulls.join(', ')
}

module.exports = {
  getTasksByListId,
  addTask,
  delTaskByTaskId,
  updateStatusByTaskId,
  editTaskByTaskId,
  delTaskByListId,
  updateTaskListId,
  getTaskNameByTaskId,
  getAllTasks,
  checkLateTasks,
  getTaskByTaskId,
}

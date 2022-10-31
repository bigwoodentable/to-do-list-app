const connection = require('./connection')
const { DateTime } = require('luxon')
const { sendEmail } = require('../email')

const addTaskByListId = (task, db = connection) => {
  //datetime saved as UTC
  const taskFormatted = {
    lists_id: task.listId,
    name: task.name,
    description: task.description,
    deadline: task.deadline,
    status: 'incomplete',
  }
  console.log('deadline', task.deadline)
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

// returns an array of late tasks' ids e.g. [1, 2, 3, null, null, null...]
const checkLateTasks = async (db = connection) => {
  const allTasks = await db('tasks').select('id', 'deadline')
  const lateTasksPromises = allTasks.map(async (task) => {
    const deadline = await db('tasks')
      .where('id', task.id)
      .select('deadline')
      .first()
    const deadLineUTC = DateTime.fromISO(deadline.deadline).toUTC().toISO()
    const timeDiff = DateTime.fromISO(deadLineUTC).diffNow()
    return timeDiff.values.milliseconds < 0 ? task.id : null
  })
  const deadlines = await Promise.all(lateTasksPromises)
  const removedNulls = deadlines.filter((id) => id !== null)
  return removedNulls
}

const emailLateTasks = async () => {
  const lateTaskIds = await checkLateTasks()
  const lateTaskNamesPromises = lateTaskIds.map(async (taskId) => {
    return await getTaskNameByTaskId(taskId)
  })
  const lateTasksName = await Promise.all(lateTaskNamesPromises)
  const nameFormatted = lateTasksName.map((obj) => obj.name).join(', ')
  sendEmail('late', nameFormatted)
  return null
}

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
  emailLateTasks,
}

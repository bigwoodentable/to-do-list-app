const express = require('express')
const { async } = require('regenerator-runtime')
const db = require('../db/tasks')
const { sendEmail, emailData } = require('../email')
const router = express.Router()

// /api/v1/tasks/add
router.post('/add', async (req, res) => {
  const task = req.body
  try {
    await db.addTaskByListId(task)
    return res.json('success in adding the task')
  } catch (error) {
    console.error(error)
    return null
  }
})

// /api/v1/tasks/del/:taskId
router.delete('/del/:taskId', async (req, res) => {
  const taskId = req.params.taskId
  try {
    await db.delTaskByTaskId(taskId)
    return res.json('success in deleting the task')
  } catch (error) {
    console.error(error)
    return null
  }
})

// {
//   category: 'completed',
//   data: {
//     completedTasks: 'Cooking',
//     lateTasks: null,
//   },
// }

// /api/v1/tasks/completed/:taskId
router.patch('/completed/:taskId', async (req, res) => {
  const taskId = req.params.taskId
  try {
    await db.updateStatusByTaskId(taskId)
    const completedTask = await db.getTaskNameByTaskId(taskId)
    sendEmail('completed', completedTask.name)
    return res.json('success in completing the task')
  } catch (error) {
    console.error(error)
    return null
  }
})

// /api/v1/tasks/update
router.patch('/update', async (req, res) => {
  const updatedTask = req.body
  try {
    const id = await db.editTaskByTaskId(updatedTask)
    return res.json('success in updating the task')
  } catch (error) {
    console.error(error)
    return null
  }
})

// /api/v1/tasks/move/:taskId/:listId
router.patch('/move/:taskId/:listId', async (req, res) => {
  const taskId = req.params.taskId
  const listId = req.params.listId
  try {
    await db.updateTaskListId(taskId, listId)
    return res.json('success in moving task to new list')
  } catch (error) {
    console.error(error)
    return null
  }
})

module.exports = router

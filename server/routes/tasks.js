const express = require('express')
const { async } = require('regenerator-runtime')
const db = require('../db/tasks')
const router = express.Router()

// /api/v1/tasks/test

router.get('/test', (req, res) => {
  // db.getTasksByListId(1).then((res) => console.log('route', res))
})

// /api/v1/tasks/add
router.post('/add', async (req, res) => {
  const task = req.body
  try {
    const id = await db.addTaskByListId(task)
    return res.json(id)
  } catch (error) {
    console.error(error)
    return null
  }
})

// /api/v1/tasks/del/:taskId
router.delete('/del/:taskId', async (req, res) => {
  const taskId = req.params.taskId
  try {
    const id = await db.delTaskByTaskId(taskId)
    return res.json('success in deleting the task')
  } catch (error) {
    console.error(error)
    return null
  }
})

// /api/v1/tasks/completed/:taskId
router.patch('/completed/:taskId', async (req, res) => {
  const taskId = req.params.taskId
  try {
    const id = await db.updateStatusByTaskId(taskId)
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

const express = require('express')
const { async } = require('regenerator-runtime')
const db = require('../db/tasks')
const { sendEmail, emailData } = require('../email')
const router = express.Router()
const { intervalCheck } = require('../intervalLateCheck')

// /api/v1/tasks/add
router.post('/add', async (req, res) => {
  const task = req.body
  try {
    await db.addTask(task)
    return res.json('success in adding the task')
  } catch (err) {
    log(err.message)
    res.status(500).json({
      error: {
        title: 'Unable to add task',
      },
    })
    return null
  }
})

// /api/v1/tasks/del/:taskId
router.delete('/del/:taskId', async (req, res) => {
  const taskId = req.params.taskId
  try {
    await db.delTaskByTaskId(taskId)
    return res.json('success in deleting the task')
  } catch (err) {
    log(err.message)
    res.status(500).json({
      error: {
        title: 'Unable to delete task',
      },
    })
    return null
  }
})

// /api/v1/tasks/completed/:taskId
router.patch('/completed/:taskId', async (req, res) => {
  const taskId = req.params.taskId
  try {
    await db.updateStatusByTaskId(taskId)
    const completedTask = await db.getTaskNameByTaskId(taskId)
    sendEmail('completed', completedTask.name)
    return res.json('success in completing the task')
  } catch (err) {
    log(err.message)
    res.status(500).json({
      error: {
        title: 'Unable to complete task',
      },
    })
    return null
  }
})

// /api/v1/tasks/update
router.patch('/update', async (req, res) => {
  const updatedTask = req.body
  try {
    await db.editTaskByTaskId(updatedTask)
    return res.json('success in updating the task')
  } catch (err) {
    log(err.message)
    res.status(500).json({
      error: {
        title: 'Unable to update task',
      },
    })
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
  } catch (err) {
    log(err.message)
    res.status(500).json({
      error: {
        title: 'Unable to move task to a different list',
      },
    })
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
  } catch (err) {
    log(err.message)
    res.status(500).json({
      error: {
        title: 'Unable to update task list id',
      },
    })
    return null
  }
})

module.exports = router

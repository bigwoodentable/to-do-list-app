const express = require('express')
const { async } = require('regenerator-runtime')
const db = require('../db/tasks')
const router = express.Router()

// /api/v1/tasks/test

router.get('/test', (req, res) => {
  // db.getTasksByListId(1).then((res) => console.log('route', res))
})

// /api/v1/tasks/add { "listId": 1, "name": "Test", "description": "Test Desc", "deadline": "Test Dead" }

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

router.delete('/del/:taskId', (req, res) => {
  const taskId = req.params.taskId
  db.delTaskByTaskId(taskId)
    .then(() => res.json('success in deleting the task'))
    .catch((err) => console.error(error))
})

// /api/v1/tasks/completed/:taskId

router.patch('/completed/:taskId', (req, res) => {
  const taskId = req.params.taskId
  db.updateStatusByTaskId(taskId)
    .then(() => res.json('success in completing the task'))
    .catch((err) => console.error(error))
})

module.exports = router

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

module.exports = router

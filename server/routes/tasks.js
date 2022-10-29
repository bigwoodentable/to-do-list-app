const express = require('express')
const db = require('../db/tasks')
const router = express.Router()

// /api/v1/tasks/test

router.get('/test', (req, res) => {
  // db.getTasksByListId(1).then((res) => console.log('route', res))
})

module.exports = router

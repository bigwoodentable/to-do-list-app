const express = require('express')
const db = require('../db/lists')
const router = express.Router()

// /api/v1/lists/all

router.get('/all', async (req, res) => {
  try {
    const lists = await db.getListsAll()
    return res.json(lists)
  } catch (error) {
    console.error(error)
    return null
  }
})

// /api/v1/lists/add

router.post('/add', async (req, res) => {
  const newList = req.body
  try {
    const id = await db.addList(newList)
    return res.json(id)
  } catch (error) {
    console.error(error)
    return null
  }
})
module.exports = router

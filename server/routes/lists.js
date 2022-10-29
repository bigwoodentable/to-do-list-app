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

module.exports = router

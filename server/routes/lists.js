const express = require('express')
const db = require('../db/lists')
const log = require('../logger')
const router = express.Router()

// /api/v1/lists/all
router.get('/all', async (req, res) => {
  try {
    const lists = await db.getListsAll()
    res.json(lists)
    return null
  } catch (err) {
    log(err.message)
    res.status(500).json({
      error: {
        title: 'Unable to retrieve lists',
      },
    })
    return null
  }
})

// /api/v1/lists/add
router.post('/add', async (req, res) => {
  const newList = req.body
  try {
    const id = await db.addList(newList)
    return res.json(id)
  } catch (err) {
    log(err.message)
    res.status(500).json({
      error: {
        title: 'Unable to add list',
      },
    })
    return null
  }
})

// /api/v1/lists/del/:listId
router.delete('/del/:listId', async (req, res) => {
  const listId = req.params.listId
  try {
    await db.delListByListId(listId)
    return res.json('success in deleting the list and the tasks in the list')
  } catch (err) {
    log(err.message)
    res.status(500).json({
      error: {
        title: 'Unable to delete list',
      },
    })
    return null
  }
})

module.exports = router

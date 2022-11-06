const express = require('express')
const db = require('../db/lists')
const log = require('../logger')
const router = express.Router()

//400 - user error e.g. user trying to get something not there, unauthorize;  500 - server issue, 100 - network status code

// /api/v1/lists/all
router.get('/all', async (req, res) => {
  try {
    const lists = await db.getListsAll()
    res.json(lists)
    return null
  } catch (err) {
    log(err.message)
    //error handler
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
// runtime - node.js, no bundler/transpiler, react-js - browser - cannot run code above es6, but it has webpack
module.exports = router

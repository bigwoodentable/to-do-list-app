const express = require('express')
const path = require('path')

const listsRoutes = require('./routes/lists')
const tasksRoutes = require('./routes/tasks')

const server = express()

//accept json request - parse request body
// *http payload
server.use(express.json())
//serve static files - e.g. bundle, pdf, img
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/lists', listsRoutes)
server.use('/api/v1/tasks', tasksRoutes)

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

module.exports = server

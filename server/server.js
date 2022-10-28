const express = require('express')
const path = require('path')

// const routes = require('./routes/')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

// server.use('/api/v1/', routes)

module.exports = server

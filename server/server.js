const express = require('express');
const path = require('path');
const { deadlineCheck } = require('./deadline-check');

const listsRoutes = require('./routes/lists');
const tasksRoutes = require('./routes/tasks');

const server = express();

server.use(express.json());
server.use(express.static(path.join(__dirname, 'public')));

//the deadline is checked at intervals, by default it is set to 1 day
//for testing, the interval is set to a shorter period
// const unregisterEmailService = deadlineCheck(5000);

server.use('/api/v1/lists', listsRoutes);
server.use('/api/v1/tasks', tasksRoutes);

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

process.on('SIGTERM', () => {
  unregisterEmailService();
});

module.exports = server;

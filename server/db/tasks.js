const connection = require('./connection');
const { ISOtoLocaleString, dateNow } = require('./datetime-utils');

// gets task by the task id
const getTaskByTaskId = (taskId, db = connection) => {
  return db('tasks')
    .where('id', taskId)
    .select('id as taskId', 'name', 'description', 'deadline')
    .first();
};

//adds a task and returns the task that was added with the new task id
//datetime saved as UTC
const addTask = async (task, db = connection) => {
  const taskFormatted = {
    lists_id: task.listId,
    name: task.name,
    description: task.description,
    deadline: task.deadline,
    status: 'incomplete',
  };
  const taskId = await db('tasks').insert(taskFormatted);
  return getTaskByTaskId(taskId[0], db);
};

//gets task by list id
const getTasksByListId = async (listId, db = connection) => {
  const tasks = await db('tasks')
    .where('lists_id', listId)
    .andWhere('status', 'incomplete')
    .select('id as taskId', 'name', 'description', 'deadline');
  return tasks.map((task) => {
    //returns datetime in a more readable format
    return task.deadline
      ? { ...task, deadline: ISOtoLocaleString(task.deadline) }
      : null;
  });
};

//deletes task by task id
const delTaskByTaskId = (taskId, db = connection) => {
  return db('tasks').where('id', taskId).del();
};

//delets task by list id
const delTaskByListId = (listId, db = connection) => {
  return db('tasks').where('lists_id', listId).del(['lists_id']);
};

//updates the status of a task from incomplete to complete
const updateStatusByTaskId = (taskId, db = connection) => {
  return db('tasks').where('id', taskId).update('status', 'completed');
};

//updates task details
const editTaskByTaskId = (task, db = connection) => {
  return db('tasks').where('id', task.taskId).update({
    name: task.name,
    description: task.description,
    deadline: task.deadline,
  });
};

//updates task's list id
const updateTaskListId = (taskId, listId, db = connection) => {
  return db('tasks').where('id', taskId).update('lists_id', listId);
};

//gets task's name by task id
const getTaskNameByTaskId = (taskId, db = connection) => {
  return db('tasks').where('id', taskId).select('name').first();
};

//gets all tasks
const getAllTasks = (db = connection) => {
  return db('tasks').select('id', 'deadline');
};

//checks whether a task's deadline has passed
//returns a string of late tasks e.g. 'Chop the carrot, Buy apple'
const checkLateTasks = async (db = connection) => {
  const latetasks = await db('tasks')
    .where('deadline', '<', dateNow())
    .whereNot('status', 'completed')
    .select('name');
  const formattedTasks = latetasks.map((task) => task.name);
  return formattedTasks.join(', ');
};

module.exports = {
  getTasksByListId,
  addTask,
  delTaskByTaskId,
  updateStatusByTaskId,
  editTaskByTaskId,
  delTaskByListId,
  updateTaskListId,
  getTaskNameByTaskId,
  getAllTasks,
  checkLateTasks,
  getTaskByTaskId,
};

import request from 'superagent'

const rootUrl = '/api/v1/tasks'

// /api/v1/tasks/add
export const addTaskByListId = (task, handleClose) => {
  return request
    .post(rootUrl + '/add')
    .send(task)
    .then((res) => res.body)
    .then(handleClose())
}

// /api/v1/tasks/del/:id
export const delTaskByTaskId = (taskId) => {
  return request.delete(rootUrl + `/del/${taskId}`).then(() => null)
}

// /api/v1/tasks/del/:id
export const taskCompleted = (taskId) => {
  return request.patch(rootUrl + `/completed/${taskId}`).then(() => null)
}

// /api/v1/tasks/update
export const updateTask = (updatedTask) => {
  return request
    .patch(rootUrl + `/update`)
    .send(updatedTask)
    .then(() => null)
}

// /api/v1/tasks/move/:taskId/:listId
export const moveTask = (taskId, listId) => {
  return request.patch(rootUrl + `/move/${taskId}/${listId}`).then(() => null)
}

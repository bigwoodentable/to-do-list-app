import request from 'superagent'

const rootUrl = '/api/v1/tasks'

// /api/v1/tasks/add
export function addTaskByListId(task, handleClose) {
  return request
    .post(rootUrl + '/add')
    .send(task)
    .then((res) => res.body)
    .then(handleClose())
}

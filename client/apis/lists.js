import request from 'superagent'

const rootUrl = '/api/v1/lists'

// /api/v1/lists/all
export const getAllLists = () => {
  return request
    .get(rootUrl + '/all')
    .then((res) => {
      return res.body
    })
    .catch((err) => console.error(err))
}

// /api/v1/lists/add
export const addList = (newList) => {
  return request
    .post(rootUrl + '/add')
    .send(newList)
    .then(() => {
      return null
    })
    .catch((err) => console.error(err))
}

// /api/v1/tasks/del/:id
export const delListByListId = (listId) => {
  return request.delete(rootUrl + `/del/${listId}`).then(() => null)
}

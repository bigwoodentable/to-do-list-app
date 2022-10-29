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

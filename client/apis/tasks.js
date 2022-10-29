import request from 'superagent'

const rootUrl = '/api/v1/tasks'

;('/api/v1/tasks/get')
export const getTasks = () => {
  return request
    .get(rootUrl + '/get')
    .then((res) => {
      return res.body
    })
    .catch((err) => console.log(err))
}

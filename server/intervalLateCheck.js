const { emailLateTasks } = require('./db/tasks')

//default set to a reminder email per day about tasks that has passed the deadline
const intervalCheck = (interval = 86400000) => {
  return setInterval(() => {
    emailLateTasks()
  }, interval)
}

//intervalCheck(5000)

exports.module = { intervalCheck }

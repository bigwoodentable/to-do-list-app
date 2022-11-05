const { checkLateTasks } = require('../db/tasks')
const { sendEmail } = require('./email')

//default set to a reminder email per day about tasks that has passed the deadline
const intervalCheck = (interval = 86400000) => {
  return setInterval(async () => {
    sendEmail('late', await checkLateTasks())
  }, interval)
}

intervalCheck(1000)

exports.module = { intervalCheck }

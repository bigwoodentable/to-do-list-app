const { checkLateTasks } = require('../db/tasks')
const { sendEmail } = require('./email')

//pooling / socket /
// check every 1 sec/min here, but send an email out every 5 min or more

//change name
const sendEmailInisde = async () => {
  sendEmail('late', await checkLateTasks())
}

//default set to a reminder email per day about tasks that has passed the deadline
const intervalCheck = (interval = 86400000) => {
  //**  shouldn't have async syntax inside
  const timer = setInterval(() => {
    sendEmailInisde()
  }, interval)

  //register + unregister
  return () => {
    clearInterval(timer)
  }
}

// intervalCheck(1000)

exports.module = { intervalCheck }

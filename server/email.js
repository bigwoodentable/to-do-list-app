const template = (body) =>
  `\r\nDear Reciever,\r\n\r\n${body}\r\n\r\nSincerely,\r\nSender\r\n`

const sendEmail = (category, task) => {
  let email = ''
  let body = ''

  switch (category) {
    case 'completed':
      body = `Congratulations! You have completed the task: ${task}!`
      email = template(body)
      break
    case 'late':
      body = `Oops! The following task(s) has passed the deadline: ${task}!`
      email = template(body)
      break
    default:
      return null
  }
  console.log(email)
}

module.exports = {
  sendEmail,
}

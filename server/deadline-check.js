const { checkLateTasks } = require('./db/tasks');
const { sendEmail } = require('./email');

const sendEmailWrapper = async () => {
  const message = await checkLateTasks();
  message !== '' ? sendEmail('late', message) : null;
};

//default set to a reminder email per day about tasks that has passed the deadline
const deadlineCheck = (interval = 86400000) => {
  const timer = setInterval(() => {
    sendEmailWrapper();
  }, interval);

  return () => {
    clearInterval(timer);
  };
};

module.exports = { deadlineCheck };

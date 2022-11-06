const { checkLateTasks } = require('./db/tasks');
const { sendEmail } = require('./email');

const sendEmailWrapper = async () => {
  sendEmail('late', await checkLateTasks());
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

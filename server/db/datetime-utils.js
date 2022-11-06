const { DateTime } = require('luxon');

// Converts datetime from ISO format to a more easily readable format
const ISOtoLocaleString = (dateTime) => {
  return DateTime.fromISO(dateTime).toLocaleString(DateTime.DATETIME_SHORT);
};

//this needs improvement, it is not very accurate
const dateNow = () => {
  return DateTime.now().toISO();
};

module.exports = { ISOtoLocaleString, dateNow };

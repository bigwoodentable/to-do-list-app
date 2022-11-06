const { DateTime } = require('luxon');

// check if dateTime is {}
// export const formatDate = (dateTime) => {
//   return dateTime ? convertToString(dateTime) : 'No Deadline';
// };

// Converts datetime from ISO format to a more easily readable format
export const formatDate = (dateTime) => {
  return DateTime.fromISO(dateTime).toLocaleString(DateTime.DATETIME_SHORT);
};

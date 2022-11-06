const { DateTime } = require('luxon')

// Converts datetime from ISO format to a more easily readable format
export const formatDate = (dateTime) => {
  return DateTime.fromObject(dateTime).toLocaleString(DateTime.DATETIME_SHORT)
}

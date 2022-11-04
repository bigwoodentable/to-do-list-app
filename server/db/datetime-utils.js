const { DateTime } = require('luxon')

// Converts datetime from ISO format to a more easily readable format
const ISOtoLocaleString = (dateTime) => {
  return DateTime.fromISO(dateTime).toLocaleString(DateTime.DATETIME_SHORT)
}

// Takes a local datetime in the ISO format and converts it into UTC format
const localToUTC = (dateTime) => {
  return DateTime.fromISO(dateTime).toUTC().toISO()
}

// Compares a datetime and the time now, returns difference in milliseconds
const timeDiff = (dateTime) => {
  const diff = DateTime.fromISO(dateTime).diffNow()
  return diff.values.milliseconds
}

module.exports = { ISOtoLocaleString, localToUTC, timeDiff }

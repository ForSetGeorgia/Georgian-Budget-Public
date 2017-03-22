const padStart = require('lodash.padstart')
const getMissingTimePeriodMontly = (timePeriods) => {
  if (!(timePeriods.length >= 2)) { return [] }
  const first = timePeriods[0]
  const last = timePeriods[timePeriods.length - 1]
  var regex = new RegExp('^y((19|20)\\d{2})_m(0[1-9]|1[0-2])$')
  if (!(regex.test(first) && regex.test(last))) {
    return []
  }

  const missingTimePeriods = []
  const [firstYear, firstMonth] = first.replace('y', '').replace('m', '').split('_').map((m) => parseInt(m))
  const [lastYear, lastMonth] = last.replace('y', '').replace('m', '').split('_').map((m) => parseInt(m))

  let isEnd = firstYear === lastYear && firstMonth === lastMonth
  let [currYear, currMonth] = [firstYear, firstMonth]
  while (!isEnd) {
    currMonth = ++currMonth % 13
    if (currMonth === 0) {
      currMonth = 1
    }
    currYear += currMonth === 1 ? 1 : 0

    isEnd = currYear === lastYear && currMonth === lastMonth
    if (!isEnd) {
      let currTimePeriod = `y${currYear}_m${padStart(currMonth, 2, '0')}`
      if (timePeriods.indexOf(currTimePeriod) === -1) {
        missingTimePeriods.push(currTimePeriod)
      }
    }
  }
  return missingTimePeriods
}

const getMissingTimePeriodQuarterly = (timePeriods) => {
  if (!(timePeriods.length >= 2)) { return [] }
  const first = timePeriods[0]
  const last = timePeriods[timePeriods.length - 1]

  var regex = new RegExp('^y((19|20)\\d{2})_q[1-4]$')
  if (!(regex.test(first) && regex.test(last))) {
    return []
  }

  const missingTimePeriods = []
  const [firstYear, firstQuarter] = first.replace('y', '').replace('q', '').split('_').map((m) => parseInt(m))
  const [lastYear, lastQuarter] = last.replace('y', '').replace('q', '').split('_').map((m) => parseInt(m))

  let isEnd = firstYear === lastYear && firstQuarter === lastQuarter
  let [currYear, currQuarter] = [firstYear, firstQuarter]

  while (!isEnd) {
    currQuarter = ++currQuarter % 5
    if (currQuarter === 0) {
      currQuarter = 1
    }
    currYear += currQuarter === 1 ? 1 : 0

    isEnd = currYear === lastYear && currQuarter === lastQuarter
    if (!isEnd) {
      let currTimePeriod = `y${currYear}_q${currQuarter}`
      if (timePeriods.indexOf(currTimePeriod) === -1) {
        missingTimePeriods.push(currTimePeriod)
      }
    }
  }
  return missingTimePeriods
}

const getMissingTimePeriodYearly = (timePeriods) => {
  if (!(timePeriods.length >= 2)) { return [] }
  const first = timePeriods[0]
  const last = timePeriods[timePeriods.length - 1]

  var regex = new RegExp('^y((19|20)\\d{2})$')
  if (!(regex.test(first) && regex.test(last))) {
    return []
  }

  const missingTimePeriods = []
  const firstYear = parseInt(first.replace('y', ''))
  const lastYear = parseInt(last.replace('y', ''))
  let isEnd = firstYear === lastYear
  let [currYear] = [firstYear]

  while (!isEnd) {
    ++currYear

    isEnd = currYear === lastYear
    if (!isEnd) {
      let currTimePeriod = `y${currYear}`
      if (timePeriods.indexOf(currTimePeriod) === -1) {
        missingTimePeriods.push(currTimePeriod)
      }
    }
  }
  return missingTimePeriods
}

module.exports = {
  getMissingTimePeriodMontly,
  getMissingTimePeriodQuarterly,
  getMissingTimePeriodYearly
}

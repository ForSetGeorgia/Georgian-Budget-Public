const { defineMessages } = require('react-intl')

const timePeriodMessages = defineMessages({
  quarter: {
    '1': {
      id: 'timePeriod.quarter.1',
      description: 'Quarter 1',
      defaultMessage: 'Quarter #1, {year}'
    },
    '2': {
      id: 'timePeriod.quarter.2',
      description: 'Quarter 2',
      defaultMessage: 'Quarter #2, {year}'
    },
    '3': {
      id: 'timePeriod.quarter.3',
      description: 'Quarter 3',
      defaultMessage: 'Quarter #3, {year}'
    },
    '4': {
      id: 'timePeriod.quarter.4',
      description: 'Quarter 4',
      defaultMessage: 'Quarter #4, {year}'
    }
  }
})

const extractYear = timePeriod => (
  /y(\d+)_/.exec(timePeriod)[1]
)

const extractQuarterNum = timePeriod => (
  /q(\d)\b/.exec(timePeriod)[1]
)

const extractMonthNum = timePeriod => (
  /m(\d+)\b/.exec(timePeriod)[1]
)

const translateYear = timePeriod => timePeriod.replace('y', '')

const translateQuarter = (timePeriod, intl) => (
  intl.formatMessage(
    timePeriodMessages.quarter[extractQuarterNum(timePeriod)],
    {year: extractYear(timePeriod)}
  )
)

const createDateFromMonthTimePeriod = timePeriod => (
  new Date(
    parseInt(extractYear(timePeriod)),
    parseInt(extractMonthNum(timePeriod)) - 1
  )
)

const translateMonth = (timePeriod, intl) => (
  intl.formatDate(
    createDateFromMonthTimePeriod(timePeriod),
    {
      year: 'numeric',
      month: 'long'
    }
  )
)

const timePeriodIsMonth = (timePeriod) => (
  /y.*m/.test(timePeriod)
)

const timePeriodIsQuarter = (timePeriod) => (
  /y.*q/.test(timePeriod)
)

const timePeriodIsYear = (timePeriod) => (
  /y/.test(timePeriod)
)

const getTimePeriodType = (timePeriod) => {
  if (timePeriodIsMonth(timePeriod)) return 'month'
  if (timePeriodIsQuarter(timePeriod)) return 'quarter'
  if (timePeriodIsYear(timePeriod)) return 'year'
  throw new Error(`Time period type for time period "${timePeriod}" could not be detected`)
}

const translateTimePeriod = (timePeriod, intl) => {
  switch (getTimePeriodType(timePeriod)) {
    case 'year':
      return translateYear(timePeriod)
    case 'quarter':
      return translateQuarter(timePeriod, intl)
    case 'month':
      return translateMonth(timePeriod, intl)
    default:
      return timePeriod
  }
}

module.exports = { translateTimePeriod }

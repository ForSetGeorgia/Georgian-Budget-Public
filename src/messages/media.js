const { defineMessages } = require('react-intl')

module.exports = defineMessages({
  next: {
    id: 'app.pagination.next',
    defaultMessage: 'Next'
  },
  previous: {
    id: 'app.pagination.previous',
    defaultMessage: 'Previous'
  },
  media_name: {
    id: 'app.media.media_name',
    defaultMessage: 'Media Name:'
  },
  author: {
    id: 'app.media.author',
    defaultMessage: 'Author:'
  },
  date: {
    id: 'app.media.date',
    defaultMessage: 'Date:'
  },
  source: {
    id: 'app.media.source',
    defaultMessage: 'Source:'
  },
  nodata: {
    id: 'app.media.nodata',
    defaultMessage: 'There data is still loading or no media records were found.'
  }
})

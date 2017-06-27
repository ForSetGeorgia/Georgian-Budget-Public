const React = require('react')
const { injectIntl, intlShape } = require('react-intl')
const { object } = React.PropTypes
const Griddle = require('griddle-react')
const axios = require('axios')
const mediaMessages = require('src/messages/media')

const MediaContent = React.createClass({
  propTypes: {
    intl: intlShape
  },
  getInitialState () {
    return {
      results: [],
      currentPage: 0,
      pageSize: 10,
      maxPages: 0
    }
  },
  componentWillMount: function () {
    this.loadDataFromAPI(this.state.currentPage)
  },
  setPage: function (index) { // This should interact with the data source to get the page at the given index
    this.loadDataFromAPI(index)
  },

  updateState ({results, currentPage, total}) {
    // console.log(results, currentPage, total)
    this.setState({
      maxPages: Math.ceil(total / this.state.pageSize),
      results: results,
      currentPage: currentPage
    })
  },
  loadDataFromAPI (currentPage) {
    const { intl } = this.props
    axios.get(
      `${process.env.API_URL}/${intl.locale}/v1/media?page=${currentPage + 1}&per_page=${this.state.pageSize}`,
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-Key-Inflection': 'camel'
        }
      }
    )
    .then(response => {
      // console.log('then', response)
      if (!(response.hasOwnProperty('data') && response.data.hasOwnProperty('results') && response.data.hasOwnProperty('total'))) {
        this.setState({
          title: 'Unable to load media data'
        })

        return
      }
      var d = response.data
      this.updateState({
        results: d.results,
        currentPage: currentPage,
        total: +d.total
      })
    })
  },
  setPageSize: function (size) { },
  changeSort: function (sort, sortAscending) {},
  setFilter: function (filter) {},

  render () {
    return (
      <Griddle

        useCustomRowComponent
        customRowComponent={injectIntl(MediaListItemComponent)}

        useGriddleStyles={false}
        gridClassName='gb-MediaContent'
        customRowComponentClassName='gb-MediaList'

        noDataMessage='sorry'

        useExternal
        externalCurrentPage={this.state.currentPage}
        externalMaxPage={this.state.maxPages}
        externalSetPage={this.setPage}
        externalSetPageSize={this.setPageSize}
        externalChangeSort={this.changeSort}
        externalSetFilter={this.setFilter}

        results={this.state.results}
        resultsPerPage={this.state.pageSize}

        previousText={this.props.intl.formatMessage(mediaMessages.previous)}
        previousClassName='gb-GriddlePaginationLink'
        previousIconComponent='← '
        nextText={this.props.intl.formatMessage(mediaMessages.next)}
        nextClassName='gb-GriddlePaginationLink'
        nextIconComponent=' →'

        />
    )
  }
})

var MediaListItemComponent = React.createClass({
  propTypes: {
    intl: intlShape,
    data: object.isRequired
  },
  render: function () {
    const { data: item } = this.props

    return (
      <div className='gb-MediaListItem'>
        <h4 className='title'>{item.title}</h4>
        <div className='field-wrapper'>
          <label className='field-label'>{this.props.intl.formatMessage(mediaMessages.media_name)}</label>
          <div className='field-value'>{item.mediaName}</div>
        </div>
        <div className='field-wrapper'>
          <label className='field-label'>{this.props.intl.formatMessage(mediaMessages.author)}</label>
          <div className='field-value'>{item.author}</div>
        </div>
        <div className='field-wrapper'>
          <label className='field-label'>{this.props.intl.formatMessage(mediaMessages.date)}</label>
          <div className='field-value'>{item.publishedAt}</div>
        </div>
        <div className='media-wrapper' dangerouslySetInnerHTML={{__html: item.media}}></div>
        <div className='description' dangerouslySetInnerHTML={{__html: item.description}}></div>
        <div className='field-wrapper source'>
          <label className='field-label'>{this.props.intl.formatMessage(mediaMessages.source)}</label>
          <div className='field-value'><a href='{item.source}'>{item.source}</a></div>
        </div>
      </div>
    )
  }
})

module.exports = injectIntl(MediaContent)

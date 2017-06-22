const React = require('react')
const { injectIntl, intlShape } = require('react-intl')
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
      maxPages: 0,
    }
  },
  componentWillMount: function () {
    this.loadDataFromAPI(this.state.currentPage)
  },
  setPage: function (index) { // This should interact with the data source to get the page at the given index
    console.log('setPage')
    this.loadDataFromAPI(index)
  },

  updateState ({results, currentPage, total}) {
    console.log(results)
    this.setState({
      maxPages: Math.ceil(total / this.state.pageSize),
      results: results,
      currentPage: currentPage
    })
  },
  loadDataFromAPI (currentPage) {
    axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage+1}&_limit=${this.state.pageSize}`,
      // `${process.env.API_URL}/${intl.locale}/v1/page_contents/about`,
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-Key-Inflection': 'camel'
        }
      }
    )
    .then(response => {
      console.log('then', response)
      if (!((response || {}).data || {})) {
        this.setState({
          title: 'Unable to load media data'
        })

        return
      }

      this.updateState({
        results: response.data,
        currentPage: currentPage,
        total: +response.headers['x-total-count']
      })
    })

  },
  setPageSize: function (size) { },
  changeSort: function(sort, sortAscending){},
  setFilter: function(filter){},
  getResults: function(){ console.log('getResults')},

  render () {
    return (
      <Griddle

        useCustomRowComponent
        customRowComponent={injectIntl(OtherComponent)}

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

var OtherComponent = React.createClass({
  render: function () {
    const { data: item } = this.props
    item.author = 'Ipsum Lorem'
    item.media_name = 'CNN'
    item.date = '15/03/2016'
    item.embed_code = '<iframe src="https://giphy.com/embed/RyIFWRsw4nkYw" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>'
    item.source = 'https://drive.google.com/drive/search?q=pin'
    return (
      <div className='gb-MediaListItem'>
        <h4 className='title'>{item.id}. {item.title}</h4>
        <div className='field-wrapper'>
          <label className='field-label'>{this.props.intl.formatMessage(mediaMessages.media_name)}</label>
          <div className='field-value'>{item.media_name}</div>
        </div>
        <div className='field-wrapper'>
          <label className='field-label'>{this.props.intl.formatMessage(mediaMessages.author)}</label>
          <div className='field-value'>{item.author}</div>
        </div>
        <div className='field-wrapper'>
          <label className='field-label'>{this.props.intl.formatMessage(mediaMessages.date)}</label>
          <div className='field-value'>{item.date}</div>
        </div>
        <div className='embed-wrapper' dangerouslySetInnerHTML={{__html: item.embed_code}}></div>
        <div className='description'>{item.body}</div>
        <div className='source'><a href='{item.source}'>{item.source}</a></div>
      </div>
    )
  }
})

module.exports = injectIntl(MediaContent)

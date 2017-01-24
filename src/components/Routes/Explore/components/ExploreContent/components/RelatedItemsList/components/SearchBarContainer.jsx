const React = require('react')
const { func, string } = React.PropTypes
const { connect } = require('react-redux')

const { setSearch, getSearch } = require('src/data/ducks/filters')

const SearchBar = require('./SearchBar')

const SearchBarContainer = React.createClass({
  propTypes: {
    changeFilter: func,
    setSearch: func,
    query: string
  },

  onChange (event) {
    const { setSearch, changeFilter } = this.props
    const { value } = event.target

    setSearch(value)
    changeFilter(value)
  },

  componentDidMount () {
    const { changeFilter, query } = this.props

    changeFilter(query)
  },

  render () {
    return (
      <SearchBar
        onChange={this.onChange}
        query={this.props.query}
      />
    )
  }
})

const mapStateToProps = state => ({
  query: getSearch(state)
})

const mapDispatchToProps = dispatch => ({
  setSearch: query => dispatch(setSearch(query))
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(SearchBarContainer)

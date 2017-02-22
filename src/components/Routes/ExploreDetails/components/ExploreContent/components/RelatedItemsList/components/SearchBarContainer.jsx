const React = require('react')
const { func, string } = React.PropTypes
const { connect } = require('react-redux')

const { setSearch, getSearch } = require('src/data/ducks/filters')

const SearchBar = require('./SearchBar')

const SearchBarContainer = React.createClass({
  propTypes: {
    setSearch: func,
    query: string
  },

  onChange (event) {
    const { setSearch } = this.props
    const { value } = event.target

    setSearch(value)
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

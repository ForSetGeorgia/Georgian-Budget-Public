const React = require('react')
const SearchBar = require('./SearchBar')
const { func } = React.PropTypes

const SearchBarContainer = React.createClass({
  propTypes: {
    changeFilter: func
  },

  getInitialState () {
    return {
      query: ''
    }
  },

  onChange (event) {
    this.setState({
      query: event.target.value
    })
    this.props.changeFilter(event.target.value)
  },

  render () {
    return (
      <SearchBar
        onChange={this.onChange}
      />
    )
  }
})

module.exports = SearchBarContainer

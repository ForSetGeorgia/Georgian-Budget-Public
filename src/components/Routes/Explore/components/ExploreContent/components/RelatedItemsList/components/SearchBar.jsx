const React = require('react')
const { func } = React.PropTypes

const SearchBar = React.createClass({
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
      <div className='gb-SearchBar'>
        <input
          className='gb-SearchBar-input'
          type='text'
          name='budget-item-select-search-bar'
          placeholder='Search'
          onChange={this.onChange}
        />
      </div>
    )
  }
})

module.exports = SearchBar

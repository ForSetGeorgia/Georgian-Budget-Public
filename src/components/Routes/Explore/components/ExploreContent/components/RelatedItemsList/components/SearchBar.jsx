const React = require('react')
const { func } = React.PropTypes

const SearchBar = props => (
  <div className='gb-SearchBar'>
    <input
      className='gb-SearchBar-input'
      type='text'
      name='budget-item-select-search-bar'
      placeholder='Search'
      onChange={props.onChange}
    />
  </div>
)

SearchBar.propTypes = {
  onChange: func
}

module.exports = SearchBar

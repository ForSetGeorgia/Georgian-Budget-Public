const React = require('react')
const { func, string } = React.PropTypes

const SearchBar = props => (
  <div className='gb-SearchBar'>
    <input
      className='gb-SearchBar-input'
      type='text'
      name='budget-item-select-search-bar'
      placeholder='Search'
      onChange={props.onChange}
      value={props.query}
    />
  </div>
)

SearchBar.propTypes = {
  onChange: func,
  query: string
}

module.exports = SearchBar

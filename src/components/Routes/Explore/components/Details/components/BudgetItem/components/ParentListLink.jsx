const React = require('react')
const { string, func } = React.PropTypes
const { connect } = require('react-redux')

const { setBudgetItemType } = require('src/data/ducks/filters')
const { setExploreDisplay } = require('src/data/ducks/explore')

const ParentListLink = React.createClass({
  propTypes: {
    text: string.isRequired,
    budgetItemType: string.isRequired,
    setBudgetItemType: func.isRequired,
    setExploreDisplay: func.isRequired
  },

  handleClickEvent () {
    const { setExploreDisplay, setBudgetItemType, budgetItemType } = this.props

    setBudgetItemType(budgetItemType)
    setExploreDisplay('list')
  },

  render () {
    const { text } = this.props
    return (
      <a href='#' onClick={this.handleClickEvent}>{text}</a>
    )
  }
})

const mapStateToProps = state => ({
  text: 'View Child Programs'
})

const mapDispatchToProps = dispatch => ({
  setBudgetItemType: value => dispatch(setBudgetItemType(value)),
  setExploreDisplay: value => dispatch(setExploreDisplay(value))
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(ParentListLink)

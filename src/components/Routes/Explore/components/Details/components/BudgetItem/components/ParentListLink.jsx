const React = require('react')
const { string, func } = React.PropTypes
const { connect } = require('react-redux')

const { setBudgetItemType } = require('src/data/ducks/filters')
const {
  switchDisplayToList,
  setParentItemId
} = require('src/data/ducks/explore')

const ParentListLink = React.createClass({
  propTypes: {
    text: string.isRequired,
    budgetItemType: string.isRequired,
    setBudgetItemType: func.isRequired,
    switchDisplayToList: func.isRequired,
    selectParent: func.isRequired
  },

  handleClickEvent () {
    const {
      switchDisplayToList,
      setBudgetItemType,
      budgetItemType,
      selectParent
    } = this.props

    setBudgetItemType(budgetItemType)
    switchDisplayToList()
    selectParent()
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  setBudgetItemType: value => dispatch(setBudgetItemType(value)),
  switchDisplayToList: value => dispatch(switchDisplayToList()),
  selectParent: () => dispatch(setParentItemId(ownProps.parentItemId))
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(ParentListLink)

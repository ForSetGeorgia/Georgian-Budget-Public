const React = require('react')
const { injectIntl } = require('react-intl')
const { object, string } = React.PropTypes
const { connect } = require('react-redux')

const {
  getSelectedBudgetItems
} = require('js/redux/ducks/explore')

const BudgetItem = require('./components/BudgetItem/index')
const LoadingIndicator = require('js/components/shared/LoadingIndicator')

let ExploreDetails = React.createClass({
  contextTypes: {
    currentLocale: string
  },

  propTypes: {
    selectedItems: object.isRequired
  },

  isLoading () {
    return this.loadedSelectedItemIds().length === 0
  },

  loadedSelectedItemIds () {
    return Object.keys(this.props.selectedItems)
  },

  render () {
    const { selectedItems } = this.props

    let content
    if (this.isLoading()) {
      content = (
        <LoadingIndicator />
      )
    } else {
      const id = this.loadedSelectedItemIds()[0]
      const budgetItem = selectedItems[id]

      content = (
        <BudgetItem
          {...budgetItem}
          id={id}
        />
      )
    }

    return (<div className='gb-ExploreDetails'>
      {content}
    </div>)
  }
})

const mapStateToProps = state => ({
  selectedItems: getSelectedBudgetItems(state)
})

ExploreDetails = injectIntl(connect(mapStateToProps)(ExploreDetails))

module.exports = ExploreDetails

const React = require('react')
const { injectIntl } = require('react-intl')
const { arrayOf, string } = React.PropTypes
const { connect } = require('react-redux')

const BudgetItemHeading = require('./components/BudgetItemHeading')
const BudgetItemCharts = require('./components/BudgetItemCharts')
const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const BudgetItemYearlyTable = require('./components/BudgetItemYearlyTable')

const { getSelectedTimePeriods } = require('src/data/ducks/filters')

const BudgetItem = React.createClass({
  propTypes: {
    id: string.isRequired,
    name: string.isRequired,
    loaded: arrayOf(string).isRequired,
    selectedTimePeriod: string
  },

  detailsLoaded () {
    return this.props.loaded.includes('details')
  },

  componentDidMount () {
    if (this.detailsLoaded()) return
  },

  renderDetails () {
    const { id, selectedTimePeriod } = this.props

    return (
      <div>
        <BudgetItemCharts {...{ id, selectedTimePeriod }} />
        <BudgetItemYearlyTable itemId={id} />
      </div>
    )
  },

  render () {
    const { name, selectedTimePeriod } = this.props

    let details = ''

    if (this.detailsLoaded()) {
      details = this.renderDetails()
    } else {
      details = <LoadingIndicator />
    }

    return (
      <div className='gb-BudgetItem'>
        <BudgetItemHeading name={name} timePeriod={selectedTimePeriod} />

        {details}

      </div>
    )
  }
})

const mapStateToProps = state => ({
  selectedTimePeriod: getSelectedTimePeriods(state)[0]
})

module.exports = injectIntl(connect(mapStateToProps, null)(BudgetItem))

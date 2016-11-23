const React = require('react')
const { array, string } = React.PropTypes

const FinancesTimeSeries = require('./components/FinancesTimeSeries')

const BudgetItem = React.createClass({
  propTypes: {
    id: string.isRequired,
    name: string.isRequired,
    financeType: string,
    timePeriodType: string,
    timePeriods: array,
    amounts: array
  },
  render () {
    const { id, name, financeType, timePeriodType, timePeriods, amounts } = this.props

    let chart = ''

    if (id && financeType && timePeriodType && timePeriods && amounts) {
      chart = <FinancesTimeSeries
        id={id}
        financeType={financeType}
        timePeriodType={timePeriodType}
        timePeriods={timePeriods}
        amounts={amounts}
      />
    }

    return (
      <div className='gb-BudgetItem'>

        <h3 className='gb-BudgetItem-heading'>
          {name}
        </h3>

        {chart}

      </div>
    )
  }
})

module.exports = BudgetItem

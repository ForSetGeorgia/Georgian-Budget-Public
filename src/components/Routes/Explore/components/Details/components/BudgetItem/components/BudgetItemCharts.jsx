const React = require('react')
const { string } = React.PropTypes
const { intlShape, injectIntl } = require('react-intl')
const { Tab, Tabs, TabList, TabPanel } = require('react-tabs')

const FinancesTimeSeries = require('./FinancesTimeSeries')
const timePeriodTypeMessages = require('src/messages/timePeriodTypes')

const BudgetItemCharts = React.createClass({
  propTypes: {
    id: string,
    selectedTimePeriod: string,
    intl: intlShape
  },

  getInitialState () {
    return {
      visibleTimePeriodType: 'month'
    }
  },

  renderChartTitle (timePeriodType) {
    const { intl } = this.props
    return (
      <h3>
        {intl.formatMessage(timePeriodTypeMessages[timePeriodType])}
      </h3>
    )
  },

  renderChart (timePeriodType) {
    const { id, selectedTimePeriod } = this.props

    const surroundingTimePeriod = timePeriodType === 'year' ? 'all' : selectedTimePeriod

    return (
      <FinancesTimeSeries
        key={`${timePeriodType}-${selectedTimePeriod}`}
        itemIds={[id]}
        timePeriodType={timePeriodType}
        showSpentFinances
        showPlannedFinances
        inTimePeriod={surroundingTimePeriod}
      />
    )
  },

  getTimePeriodTypes () {
    return ['year', 'quarter', 'month']
  },

  getChartGroups () {
    return this.getTimePeriodTypes().map(timePeriodType => ({
      title: this.renderChartTitle(timePeriodType),
      chart: this.renderChart(timePeriodType)
    }))
  },

  defaultTabIndex () {
    return this.getTimePeriodTypes().indexOf(this.state.visibleTimePeriodType)
  },

  handleSelectTabEvent (index) {
    this.setState({
      visibleTimePeriodType: this.getTimePeriodTypes()[index]
    })
  },

  render () {
    const chartGroups = this.getChartGroups()
    return (
      <Tabs
        selectedIndex={this.defaultTabIndex()}
        onSelect={this.handleSelectTabEvent}
      >

        <TabList>
          {chartGroups.map((chartGroup, index) => (
            <Tab key={index}>{chartGroup.title}</Tab>
          ))}
        </TabList>

        {chartGroups.map((chartGroup, index) => (
          <TabPanel key={index}>{chartGroup.chart}</TabPanel>
        ))}

      </Tabs>
    )
  }
})

module.exports = injectIntl(BudgetItemCharts)

const React = require('react')
const { connect } = require('react-redux')
const { string, func } = React.PropTypes
const { intlShape, injectIntl } = require('react-intl')
const { Tab, Tabs, TabList, TabPanel } = require('react-tabs')

const {
  getSelectedTimePeriods,
  getTimePeriodType,
  setTimePeriodType
} = require('src/data/ducks/filters')

const { getDetailsItemId } = require('src/data/ducks/explore')

const FinancesTimeSeries = require('./FinancesTimeSeries')
const timePeriodTypeMessages = require('src/messages/timePeriodTypes')

const BudgetItemCharts = React.createClass({
  propTypes: {
    itemId: string,
    selectedTimePeriod: string,
    intl: intlShape,
    timePeriodType: string,
    setTimePeriodType: func
  },

  renderChartTitle (timePeriodType) {
    const { intl } = this.props
    return (
      <h3>
        {intl.formatMessage(timePeriodTypeMessages[timePeriodType].adjective)}
      </h3>
    )
  },

  renderChart (timePeriodType) {
    const { itemId, selectedTimePeriod } = this.props

    const surroundingTimePeriod = timePeriodType === 'year' ? 'all' : selectedTimePeriod

    return (
      <FinancesTimeSeries
        key={`${timePeriodType}-${selectedTimePeriod}`}
        itemIds={[itemId]}
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

  selectedTabIndex () {
    return this.getTimePeriodTypes().indexOf(this.props.timePeriodType)
  },

  handleSelectTabEvent (index) {
    this.props.setTimePeriodType(this.getTimePeriodTypes()[index])
  },

  render () {
    const chartGroups = this.getChartGroups()
    return (
      <Tabs
        selectedIndex={this.selectedTabIndex()}
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

const mapStateToProps = state => ({
  itemId: getDetailsItemId(state),
  selectedTimePeriod: getSelectedTimePeriods(state)[0],
  timePeriodType: getTimePeriodType(state)
})

const mapDispatchToProps = dispatch => ({
  setTimePeriodType: value => { dispatch(setTimePeriodType(value)) }
})

module.exports = injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(BudgetItemCharts)
)

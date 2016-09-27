const React = require('react')
const { Link } = require('react-router')

const Helmet = require('react-helmet')

const BudgetItemSelect = require('./BudgetItemSelect')
const FinanceTypeSelect = require('./FinanceTypeSelect')
const DataDisplay = require('./DataDisplay')

const Explore = () => (
  <main>
    <Helmet
      title='Explore'
    />
    <Link to='/ka'>
      Back to home!
    </Link>
    <FinanceTypeSelect />
    <BudgetItemSelect />
    <DataDisplay />
  </main>
)

module.exports = Explore

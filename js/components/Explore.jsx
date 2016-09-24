const React = require('react')
const { Link } = require('react-router')

const BudgetItemSelect = require('./BudgetItemSelect')
const DataDisplay = require('./DataDisplay')

const Explore = () => (
  <main>
    <Link to='/ka'>
      Back to home!
    </Link>
    <BudgetItemSelect />
    <DataDisplay />
  </main>
)

module.exports = Explore

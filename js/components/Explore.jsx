const React = require('react')
const { Link } = require('react-router')

const Helmet = require('react-helmet')

const BudgetItemSelect = require('./BudgetItemSelect')
const DataDisplay = require('./DataDisplay')

const Explore = () => (
  <main>
    <Helmet
      title='Explore'
    />
    <Link to='/ka'>
      Back to home!
    </Link>
    <BudgetItemSelect />
    <DataDisplay />
  </main>
)

module.exports = Explore

const React = require('react')
const Helmet = require('react-helmet')

const BudgetItemsList = require('js/components/BudgetItemsList')
const Filters = require('./filters/Filters')

const Explore = React.createClass({
  render () {
    return (
      <div>
        <Helmet
          title='Explore'
        />

        <Filters />
        <BudgetItemsList />
      </div>
    )
  }
})

module.exports = Explore

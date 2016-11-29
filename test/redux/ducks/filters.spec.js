// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const filters = require('js/redux/ducks/filters')
const { setFinanceType, setBudgetItemType, setTimePeriods } = filters
const initialState = require('js/redux/initialState').filters

describe('filters reducer', () => {
  it('handles setFinanceType action', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        financeType: 'spent_finance'
      }
    )

    const action = setFinanceType('planned_finance')
    const newState = filters(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        financeType: 'planned_finance'
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })

  it('handles setBudgetItemType', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        budgetItemType: 'total'
      }
    )

    const action = setBudgetItemType('program')
    const newState = filters(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        budgetItemType: 'program'
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })

  it('handles setTimePeriods', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        timePeriods: ['y2015']
      }
    )

    const action = setTimePeriods(['y2014'])
    const newState = filters(previousState, action)

    expect(newState).to.deep.equal(Object.assign(
      {},
      initialState,
      {
        timePeriods: ['y2014']
      }
    ))
  })
})

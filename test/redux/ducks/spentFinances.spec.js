// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const initialState = require('src/data/initialState')
const spentFinances = require('src/data/ducks/spentFinances')
const { getSpentFinances, mergeSpentFinances } = spentFinances

describe('spentFinances reducer', () => {
  it('handles mergeSpentFinances action', () => {
    const initialSpentFinancesState = getSpentFinances(initialState)
    const previousState = Object.assign(
      {},
      initialSpentFinancesState,
      {
        '1': {
          amount: 2,
          timePeriodType: 'quarterly'
        },
        '2': {
          amount: 2
        }
      }
    )

    const newState = spentFinances(previousState, mergeSpentFinances(
      {
        '1': {
          amount: 1
        }
      }
    ))

    expect(newState).to.deep.eq(Object.assign(
      {},
      initialSpentFinancesState,
      {
        '1': {
          amount: 1,
          timePeriodType: 'quarterly'
        },
        '2': {
          amount: 2
        }
      }
    ))
  })
})

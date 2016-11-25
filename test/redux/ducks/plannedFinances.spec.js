// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const initialState = require('js/redux/initialState')
const plannedFinances = require('js/redux/ducks/plannedFinances')
const { getPlannedFinances, mergePlannedFinances } = plannedFinances

describe('plannedFinances reducer', () => {
  it('handles mergePlannedFinances action', () => {
    const initialPlannedFinancesState = getPlannedFinances(initialState)
    const previousState = Object.assign(
      {},
      initialPlannedFinancesState,
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

    const newState = plannedFinances(previousState, mergePlannedFinances(
      {
        '1': {
          amount: 1
        }
      }
    ))

    expect(newState).to.deep.eq(Object.assign(
      {},
      initialPlannedFinancesState,
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

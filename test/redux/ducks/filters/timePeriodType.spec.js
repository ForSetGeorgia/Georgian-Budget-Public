// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const timePeriodTypeFilter = require('js/redux/ducks/filters/timePeriodType')
const { setTimePeriodType } = timePeriodTypeFilter
const initialState = require('js/redux/initialState').filters.timePeriodType

describe('timePeriodTypeFilter reducer', () => {
  it ('handles setTimePeriodType action', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        value: 'monthly'
      }
    )

    const action = setTimePeriodType('quarterly')

    const nextState = timePeriodTypeFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        value: 'quarterly'
      }
    )

    expect(nextState).to.deep.equal(expectedState)
  })
})

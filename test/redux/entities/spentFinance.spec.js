// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')

const initialState = require('js/redux/initialState')

const spentFinancesReducer = require('js/redux/ducks/spentFinances')
const { mergeSpentFinances } = spentFinancesReducer

const { getSpentFinance } = require('js/redux/entities/spentFinance')

describe('getSpentFinance', () => {
  it('gets the spent finance data for the provided id', () => {
    const state = {
      spentFinances: {
        '1': {
          amount: 1
        },
        '2': {
          amount: 2
        }
      }
    }

    expect(getSpentFinance(state, 1)).to.deep.eq({
      amount: 1
    })
  })
})

// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')

const {
  getBudgetItem,
  getItemSpentFinanceIds,
  getItemSpentFinances
} = require('src/data/modules/entities/budgetItem')

describe('getBudgetItem', () => {
  it('gets item data', () => {
    const state = {
      budgetItems: {
        '1': { name: 'hi' },
        '2': { name: 'bye' }
      }
    }

    expect(getBudgetItem(state, 1)).to.deep.eq({ name: 'hi'})
  })
})

describe('getItemSpentFinanceIds', () => {
  const state = {
    budgetItems: {
      '1': {
        spentFinances: [1, 2, 3]
      }
    }
  }

  expect(getItemSpentFinanceIds(state, 1)).to.deep.eq([1, 2, 3])
})

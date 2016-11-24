// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')

const {
  getBudgetItem,
  getItemSpentFinanceIds,
  getItemSpentFinances
} = require('js/redux/entities/budgetItem')

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

describe('getItemSpentFinances', () => {
  it("gets item's spent finances", () => {
    const state = {
      budgetItems: {
        '1': {
          spentFinances: [3]
        },
        '2': {
          spentFinances: [1, 2]
        }
      },
      spentFinances: {
        '1': {
          amount: 1
        },
        '2': {
          amount: 2
        },
        '3': {
          amount: 3
        }
      }
    }

    expect(getItemSpentFinances(state, 2)).to.deep.eq([
      {
        amount: 1
      }, {
        amount: 2
      }
    ])
  })
})

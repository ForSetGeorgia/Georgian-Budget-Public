// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const initialState = require('js/initialState').filters.budgetItems
const budgetItemsFilter = require('js/ducks/filters/budgetItems')

const {
  startLoadingBudgetItemFilter,
  finishLoadingBudgetItemFilter,
  setBudgetItemFilterOptions,
  setSelectedBudgetItemIds
} = budgetItemsFilter

describe('budget items filter reducer', () => {
  it('handles startLoadingBudgetItemFilter action', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        loading: false
      }
    )

    const action = startLoadingBudgetItemFilter()
    const newState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        loading: true
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })

  it('handles finishLoadingBudgetItemFilter', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        loading: true
      }
    )

    const action = finishLoadingBudgetItemFilter()
    const newState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        loading: false
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })

  it('handles SET_BUDGET_ITEM_TYPE action when not budget item type is not total', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        options: [
          { id: 10, name: 'hello!' }
        ],
        hidden: true
      }
    )

    const action = {
      type: 'SET_BUDGET_ITEM_TYPE',
      value: 'woooo'
    }

    const newState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        options: [],
        hidden: false
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })

  it ('handles SET_BUDGET_ITEM_TYPE action when not budget item type is total', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        options: [
          { id: 3443, name: '2343' }
        ],
        hidden: false
      }
    )

    const action = {
      type: 'SET_BUDGET_ITEM_TYPE',
      value: 'total'
    }

    const newState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        options: [],
        hidden: true
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })

  it('handles setBudgetItemFilterOptions action', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        options: [
          { id: 10, name: 'helo' }
        ]
      }
    )

    const action = setBudgetItemFilterOptions([
      { id: 12, name: 'hello' },
      { id: 54, name: 'fdf' }
    ])

    const newState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        options: [
          { id: 12, name: 'hello' },
          { id: 54, name: 'fdf' }
        ]
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })

  it('handles setSelectedBudgetItemIds action', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        selectedIds: [1]
      }
    )

    const action = setSelectedBudgetItemIds([4, 6, 1])
    const newState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        selectedIds: [4, 6, 1]
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })
})

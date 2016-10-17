// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const initialState = require('js/initialState').filters.budgetItems
const budgetItemsFilter = require('js/ducks/filters/budgetItems')

const {
  startLoadingBudgetItemFilter,
  finishLoadingBudgetItemFilter,
  setBudgetItemFilterOptions,
  setSelectedBudgetItemIds,
  setBudgetItemsFilterVisibility
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

  it('handles setBudgetItemsFilterVisibility action when isVisible is true', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        hidden: true
      }
    )

    const action = setBudgetItemsFilterVisibility(true)
    const nextState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        hidden: false
      }
    )

    expect(nextState).to.deep.equal(expectedState)
  })

  it('handles setBudgetItemsFilterVisibility action when isVisible is false', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        hidden: false
      }
    )

    const action = setBudgetItemsFilterVisibility(false)
    const nextState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        hidden: true
      }
    )

    expect(nextState).to.deep.equal(expectedState)
  })
})

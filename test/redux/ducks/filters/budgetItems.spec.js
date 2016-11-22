// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const initialState = require('js/redux/initialState').filters.budgetItems
const budgetItemsFilter = require('js/redux/ducks/filters/budgetItems')

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
          { id: 'a', name: 'helo' }
        ]
      }
    )

    const action = setBudgetItemFilterOptions([
      { id: 'bcd', name: 'hello' },
      { id: 'efg', name: 'fdf' }
    ])

    const newState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        options: [
          { id: 'bcd', name: 'hello' },
          { id: 'efg', name: 'fdf' }
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
        selectedIds: ['a']
      }
    )

    const action = setSelectedBudgetItemIds(['b', 'c', 'd'])
    const newState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        selectedIds: ['b', 'c', 'd']
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })

  it('handles setBudgetItemsFilterVisibility action when isVisible is true', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        visible: false
      }
    )

    const action = setBudgetItemsFilterVisibility(true)
    const nextState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        visible: true
      }
    )

    expect(nextState).to.deep.equal(expectedState)
  })

  it('handles setBudgetItemsFilterVisibility action when isVisible is false', () => {
    const previousState = Object.assign(
      {},
      initialState,
      {
        visible: true
      }
    )

    const action = setBudgetItemsFilterVisibility(false)
    const nextState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialState,
      {
        visible: false
      }
    )

    expect(nextState).to.deep.equal(expectedState)
  })
})

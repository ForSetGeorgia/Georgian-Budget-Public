// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')
const initialState = require('js/redux/initialState')
const budgetItemsFilter = require('js/redux/ducks/filters/budgetItems')

const {
  startLoadingBudgetItemFilter,
  finishLoadingBudgetItemFilter,
  setBudgetItemFilterOptions,
  setSelectedBudgetItemIds,
  setBudgetItemsFilterVisibility
} = budgetItemsFilter

const {
  getBudgetItemsFilter
} = budgetItemsFilter

describe('budget items filter reducer', () => {
  it('handles startLoadingBudgetItemFilter action', () => {
    const initialBudgetItemsFilterState = getBudgetItemsFilter(initialState)
    const previousState = Object.assign(
      {},
      initialBudgetItemsFilterState,
      {
        loading: false
      }
    )

    const action = startLoadingBudgetItemFilter()
    const newState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialBudgetItemsFilterState,
      {
        loading: true
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })

  it('handles finishLoadingBudgetItemFilter', () => {
    const initialBudgetItemsFilterState = getBudgetItemsFilter(initialState)
    const previousState = Object.assign(
      {},
      initialBudgetItemsFilterState,
      {
        loading: true
      }
    )

    const action = finishLoadingBudgetItemFilter()
    const newState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialBudgetItemsFilterState,
      {
        loading: false
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })

  it('handles setBudgetItemFilterOptions action', () => {
    const initialBudgetItemsFilterState = getBudgetItemsFilter(initialState)
    const previousState = Object.assign(
      {},
      initialBudgetItemsFilterState,
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
      initialBudgetItemsFilterState,
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
    const initialBudgetItemsFilterState = getBudgetItemsFilter(initialState)
    const previousState = Object.assign(
      {},
      initialBudgetItemsFilterState,
      {
        selectedIds: ['a']
      }
    )

    const action = setSelectedBudgetItemIds(['b', 'c', 'd'])
    const newState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialBudgetItemsFilterState,
      {
        selectedIds: ['b', 'c', 'd']
      }
    )

    expect(newState).to.deep.equal(expectedState)
  })

  it('handles setBudgetItemsFilterVisibility action when isVisible is true', () => {
    const initialBudgetItemsFilterState = getBudgetItemsFilter(initialState)
    const previousState = Object.assign(
      {},
      initialBudgetItemsFilterState,
      {
        visible: false
      }
    )

    const action = setBudgetItemsFilterVisibility(true)
    const nextState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialBudgetItemsFilterState,
      {
        visible: true
      }
    )

    expect(nextState).to.deep.equal(expectedState)
  })

  it('handles setBudgetItemsFilterVisibility action when isVisible is false', () => {
    const initialBudgetItemsFilterState = getBudgetItemsFilter(initialState)
    const previousState = Object.assign(
      {},
      initialBudgetItemsFilterState,
      {
        visible: true
      }
    )

    const action = setBudgetItemsFilterVisibility(false)
    const nextState = budgetItemsFilter(previousState, action)

    const expectedState = Object.assign(
      {},
      initialBudgetItemsFilterState,
      {
        visible: false
      }
    )

    expect(nextState).to.deep.equal(expectedState)
  })
})

module.exports = {
  filters: {
    budgetItems: {
      selectedIds: [],
      options: [],
      hidden: true,
      loading: true
    },
    budgetItemType: {
      value: 'total'
    },
    financeType: {
      value: 'spent_finance'
    }
  },
  data: {
    budgetItems: [],
    errors: [],
    loading: true
  }
}

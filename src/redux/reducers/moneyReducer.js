const initialState = {
  money: { cash: 0, card: 0 },
  categories: ['Food', 'Entertainment', 'Housing', 'Health', 'Cafe', 'Cloth', 'Pets', 'Gifts', 'Relations', 'Taxi'],
  spent: {
    Taxi: {
      date5: [{ sum: 400, payWith: 'cash' }, { sum: 500, payWith: 'cash' }],
      date11: [{ sum: 100, payWith: 'cash' }, { sum: 450, payWith: 'cash' }]
    },
    Cafe: {
      date1: [{ sum: 500, payWith: 'cash' }, { sum: 100, payWith: 'cash' }],
    },
    Food: {
      date1: [{ sum: 300, payWith: 'cash' }, { sum: 1500, payWith: 'cash' }],
      date2: [{ sum: 150, payWith: 'cash' }, { sum: 1000, payWith: 'cash' }]
    },
    Cloth: {
      date1: [{ sum: 1000, payWith: 'cash' }],
    },
  },
}

export const moneyReducer = (state = initialState, action) => {
  switch (action.type) {
    default: return state
  }
}
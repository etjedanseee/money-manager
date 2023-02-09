import { ADD_SPEND } from "../actions/actionsConsts"

const initialState = {
  money: { Cash: 0, Card: 0 },
  categories: { Food: 'rgb(166,236,255)', Rest: 'rgb(40,255,36)', Housing: 'rgb(67,46,255)', Health: 'rgb(23,255,210)', Cafe: 'rgb(255,93,69)', Cloth: 'rgb(132,85,255)', Pets: 'rgb(1,254,1)', Gifts: 'rgb(187,255,35)', Relations: 'rgb(255,101,85)', Taxi: 'rgb(234,77,255)' },
  spent: {
    Taxi: {
      date5: [{ sum: 400, payWith: 'Cash' }, { sum: 500, payWith: 'Cash' }],
      date11: [{ sum: 100, payWith: 'Cash' }, { sum: 450, payWith: 'Cash' }]
    },
    Cafe: {
      date1: [{ sum: 500, payWith: 'Cash' }, { sum: 100, payWith: 'Cash' }],
    },
    Food: {
      date1: [{ sum: 300, payWith: 'Cash' }, { sum: 1500, payWith: 'Cash' }],
      date2: [{ sum: 150, payWith: 'Cash' }, { sum: 1000, payWith: 'Cash' }]
    },
    Cloth: {
      date1: [{ sum: 1000, payWith: 'Cash' }],
    },
  },
}

export const moneyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SPEND: {
      const newDate = new Date();
      const date = `${newDate.getFullYear() + '-' + newDate.getMonth() + '-' + newDate.getDate()}`
      const newSpent = {
        sum: action.payload.sum,
        payWith: action.payload.payWith
      }
      if (state.spent[action.payload.category] && state.spent[action.payload.category][date]) {
        const newArr = [...state.spent[action.payload.category][date], newSpent]
        return {
          ...state,
          spent: {
            ...state.spent,
            [action.payload.category]: { ...state.spent[[action.payload.category]], [date]: newArr }
          }
        }
      } else {
        return {
          ...state,
          spent: {
            ...state.spent,
            [action.payload.category]: { ...state.spent[[action.payload.category]], [date]: [newSpent] }
          }
        }
      }

    }
    default: return state
  }
}
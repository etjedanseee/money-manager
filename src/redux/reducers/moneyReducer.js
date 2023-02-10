import { ADD_SPEND } from "../actions/actionsConsts"

const initialState = {
  money: { Cash: 10000, Card: 5000 },
  categories: { Food: 'rgb(166,236,255)', Rest: 'rgb(40,255,36)', Housing: 'rgb(67,46,255)', Health: 'rgb(23,255,210)', Cafe: 'rgb(255,93,69)', Cloth: 'rgb(132,85,255)', Pets: 'rgb(1,254,1)', Gifts: 'rgb(187,255,35)', Relations: 'rgb(255,101,85)', Taxi: 'rgb(234,77,255)' },
  spent: {
    Taxi: {
      [new Date(2023, 1, 5)]: [{ sum: 100, payWith: 'Cash' }, { sum: 50, payWith: 'Cash' }],
      [new Date(2023, 1, 21)]: [{ sum: 10, payWith: 'Cash' }, { sum: 45, payWith: 'Cash' }]
    },
    Food: {
      [new Date(2023, 2, 5)]: [{ sum: 30, payWith: 'Cash' }, { sum: 150, payWith: 'Cash' }],
      [new Date(2023, 2, 3)]: [{ sum: 10, payWith: 'Cash' }, { sum: 100, payWith: 'Cash' }]
    },

  },
}

export const moneyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SPEND: {
      //если сегодняшнюю дату иначе нужно передать дату в экшен
      const newDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
      const newSpent = {
        sum: action.payload.sum,
        payWith: action.payload.payWith
      }
      if (state.spent[action.payload.category] && state.spent[action.payload.category][newDate]) {
        const newArr = [...state.spent[action.payload.category][newDate], newSpent]
        return {
          ...state,
          spent: {
            ...state.spent,
            [action.payload.category]: { ...state.spent[[action.payload.category]], [newDate]: newArr }
          },
          money: {
            ...state.money,
            [action.payload.payWith]: state.money[action.payload.payWith] - action.payload.sum
          }
        }
      } else {
        return {
          ...state,
          spent: {
            ...state.spent,
            [action.payload.category]: { ...state.spent[[action.payload.category]], [newDate]: [newSpent] }
          },
          money: {
            ...state.money,
            [action.payload.payWith]: state.money[action.payload.payWith] - action.payload.sum
          }
        }
      }

    }
    default: return state
  }
}
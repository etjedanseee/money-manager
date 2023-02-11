import { dateToString } from "../../utils/calcDate"
import { ADD_SPEND, SET_SORTED_SPENT } from "../actions/actionsConsts"

const initialState = {
  money: { Cash: 10000, Card: 5000 },
  categories: { Food: 'rgb(166,236,255)', Rest: 'rgb(40,255,36)', Housing: 'rgb(67,46,255)', Health: 'rgb(23,255,210)', Cafe: 'rgb(255,93,69)', Cloth: 'rgb(132,85,255)', Pets: 'rgb(1,254,1)', Gifts: 'rgb(187,255,35)', Relations: 'rgb(255,101,85)', Taxi: 'rgb(234,77,255)' },
  spent: {
    Taxi: {
      [dateToString(new Date(2023, 0, 5))]: [
        { sum: 100, payWith: 'Cash', date: new Date(2023, 1, 5) },
        { sum: 50, payWith: 'Cash', date: new Date(2023, 1, 5) }
      ],
      [dateToString(new Date(2023, 0, 21))]: [
        { sum: 5, payWith: 'Cash', date: new Date(2023, 1, 21) },
        { sum: 45, payWith: 'Cash', date: new Date(2023, 1, 21) }
      ],
      [dateToString(new Date(2023, 1, 10))]: [
        { sum: 10, payWith: 'Cash', date: new Date(2023, 2, 10) },
        { sum: 40, payWith: 'Cash', date: new Date(2023, 2, 10) }
      ],
      [dateToString(new Date(2023, 1, 3))]: [
        { sum: 10, payWith: 'Cash', date: new Date(2023, 2, 3) },
      ]
    },
    Food: {
      [dateToString(new Date(2023, 1, 5))]: [
        { sum: 30, payWith: 'Cash', date: new Date(2023, 2, 5) },
        { sum: 150, payWith: 'Cash', date: new Date(2023, 2, 5) }
      ],
      [dateToString(new Date(2023, 1, 3))]: [
        { sum: 10, payWith: 'Cash', date: new Date(2023, 2, 3) },
        { sum: 100, payWith: 'Cash', date: new Date(2023, 2, 3) }
      ]
    },
  },
  sortedCategories: [],
  sortedColors: [],
  sortedTotalSum: [],
}

export const moneyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SPEND: {
      const date = action.payload.date
      const newSpent = {
        sum: action.payload.sum,
        payWith: action.payload.payWith,
        date
      }
      if (state.spent[action.payload.category] && state.spent[action.payload.category][dateToString(date)]) {
        const newArr = [...state.spent[action.payload.category][dateToString(date)], newSpent]
        return {
          ...state,
          spent: {
            ...state.spent,
            [action.payload.category]: { ...state.spent[[action.payload.category]], [dateToString(date)]: newArr }
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
            [action.payload.category]: { ...state.spent[[action.payload.category]], [dateToString(date)]: [newSpent] }
          },
          money: {
            ...state.money,
            [action.payload.payWith]: state.money[action.payload.payWith] - action.payload.sum
          }
        }
      }
    }
    case SET_SORTED_SPENT: {
      return {
        ...state,
        sortedCategories: action.payload[0],
        sortedColors: action.payload[1],
        sortedTotalSum: action.payload[2],
      }
    }
    default: return state
  }
}
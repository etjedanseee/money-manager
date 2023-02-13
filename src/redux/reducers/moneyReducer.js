import { dateToString } from "../../utils/calcDate"
import { ADD_SPEND, SET_FILTER_INVOICE_BY, SET_SORTED_SPENT } from "../actions/actionsConsts"
import { dbSpent } from "../dbSpent"

const initialState = {
  invoice: { Cash: 3000, Card: 5000, CardX: 1000 },
  filterInvoiceBy: 'All invoice',
  categories: { Food: 'rgb(166,236,255)', Rest: 'rgb(40,255,36)', Housing: 'rgb(67,46,255)', Health: 'rgb(23,255,210)', Cafe: 'rgb(255,93,69)', Cloth: 'rgb(132,85,255)', Pets: 'rgb(1,254,1)', Gifts: 'rgb(187,255,35)', Relations: 'rgb(255,101,85)', Taxi: 'rgb(234,77,255)' },
  spent: {
    ...dbSpent
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
        date,
        description: action.payload.description
      }
      if (state.spent[action.payload.category] && state.spent[action.payload.category][dateToString(date)]) {
        const newArr = [...state.spent[action.payload.category][dateToString(date)], newSpent]
        return {
          ...state,
          spent: {
            ...state.spent,
            [action.payload.category]: { ...state.spent[[action.payload.category]], [dateToString(date)]: newArr }
          },
          invoice: {
            ...state.invoice,
            [action.payload.payWith]: state.invoice[action.payload.payWith] - action.payload.sum
          }
        }
      } else {
        return {
          ...state,
          spent: {
            ...state.spent,
            [action.payload.category]: { ...state.spent[[action.payload.category]], [dateToString(date)]: [newSpent] }
          },
          invoice: {
            ...state.invoice,
            [action.payload.payWith]: state.invoice[action.payload.payWith] - action.payload.sum
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
    case SET_FILTER_INVOICE_BY: {
      return {
        ...state,
        filterInvoiceBy: action.payload
      }
    }
    default: return state
  }
}
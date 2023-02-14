import { dateToString } from "../../utils/calcDate"
import { ADD_NEW_CATEGORY, ADD_SPEND, DELETE_CATEGORY, EDIT_CATEGORY, SET_FILTER_INVOICE_BY, SET_SORTED_SPENT, TOGGLE_IS_EDIT_CATEGORIES } from "../actions/actionsConsts"
import { dbSpent } from "../dbSpent"

const initialState = {
  invoice: { Cash: 3000, Card: 5000, CardX: 1000 },
  filterInvoiceBy: 'All invoice',
  categories: { Food: '#4ba5f2', Rest: '#f84984', Housing: '#2e393f', Health: '#49ad51', Cafe: '#4758b4', Purchases: '#7c5c4f', Pets: '#7a4ef7', Gifts: '#f35353', Relations: '#ef4981', Transport: '#f4a642' },
  spent: { ...dbSpent },
  isEditCategories: false,
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
    case ADD_NEW_CATEGORY: {
      return {
        ...state,
        categories: { ...state.categories, [action.payload.title]: action.payload.color }
      }
    }
    case EDIT_CATEGORY: {
      const newCategories = Object.entries(state.categories).filter(c => c[0] !== action.payload.category)
      const prevSpentCategory = { ...state.spent[action.payload.category] }
      const newSpent = Object.entries(state.spent).filter(c => c[0] !== action.payload.category)
      return {
        ...state,
        categories: { ...Object.fromEntries(newCategories), [action.payload.title]: action.payload.color },
        spent: {
          ...Object.fromEntries(newSpent),
          [action.payload.title]: prevSpentCategory
        }
      }
    }
    case DELETE_CATEGORY: {
      const newCategories = Object.entries(state.categories).filter(c => c[0] !== action.payload)
      const newSpent = Object.entries(state.spent).filter(c => c[0] !== action.payload)
      return {
        ...state,
        categories: { ...Object.fromEntries(newCategories) },
        spent: { ...Object.fromEntries(newSpent) }
      }
    }
    case TOGGLE_IS_EDIT_CATEGORIES: {
      return {
        ...state,
        isEditCategories: !state.isEditCategories
      }
    }
    default: return state
  }
}
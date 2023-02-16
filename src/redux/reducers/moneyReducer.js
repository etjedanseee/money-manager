import { dateToString } from "../../utils/calcDate"
import { ADD_NEW_CATEGORY, ADD_NEW_INVOICE, ADD_SPEND, ADD_SUM_TO_INVOICE, DELETE_CATEGORY, DELETE_INVOICE, EDIT_CATEGORY, EDIT_INVOICE, SET_FILTER_INVOICE_BY, SET_SORTED_SPENT, TOGGLE_IS_EDIT_CATEGORIES } from "../actions/actionsConsts"
import { dbSpent } from "../dbSpent"

const initialState = {
  invoice: { Cash: { balance: 3000, color: '#4efe00' }, Card: { balance: 5000, color: '#ed2ae3' }, CardX: { balance: -200, color: '#051cfa' } },
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
        description: action.payload.description,
        id: action.payload.id
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
            [action.payload.payWith]: state.invoice[action.payload.payWith].balance - action.payload.sum
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
            [action.payload.payWith]: {
              ...state.invoice[action.payload.payWith],
              balance: state.invoice[action.payload.payWith].balance - action.payload.sum
            }
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
    case ADD_NEW_INVOICE: {
      return {
        ...state,
        invoice: {
          ...state.invoice, [action.payload.title]: { color: action.payload.color, balance: parseFloat(action.payload.balance) }
        }
      }
    }
    case EDIT_INVOICE: {
      if (action.payload.invoice !== action.payload.title) {
        const newInvoice = Object.entries(state.invoice).filter(c => c[0] !== action.payload.invoice)
        const newSpent = {}
        for (let cg of Object.keys(state.spent)) {
          newSpent[cg] = {}
          for (let date in state.spent[cg]) {
            newSpent[cg][date] = []
            for (let op of state.spent[cg][date]) {
              if (op.payWith === action.payload.invoice) {
                const newOp = {
                  ...op,
                  payWith: action.payload.title,
                }
                newSpent[cg][date].push(newOp)
              } else {
                newSpent[cg][date].push(op)
              }
            }
          }
        }
        return {
          ...state,
          invoice: {
            ...Object.fromEntries(newInvoice),
            [action.payload.title]: { balance: parseFloat(action.payload.balance), color: action.payload.color }
          },
          spent: { ...newSpent }
        }
      } else {
        return {
          ...state,
          invoice: {
            ...state.invoice,
            [action.payload.title]: { balance: parseFloat(action.payload.balance), color: action.payload.color }
          },
        }
      }
    }
    case DELETE_INVOICE: {
      if (Object.keys(state.invoice).length > 1) {
        const newInvoice = Object.entries(state.invoice).filter(c => c[0] !== action.payload)
        const newSpent = {}
        for (let cg of Object.keys(state.spent)) {
          newSpent[cg] = {}
          for (let date in state.spent[cg]) {
            newSpent[cg][date] = []
            for (let op of state.spent[cg][date]) {
              if (op.payWith !== action.payload) {
                newSpent[cg][date].push(op)
              }
            }
          }
        }
        return {
          ...state,
          invoice: { ...Object.fromEntries(newInvoice) },
          spent: { ...newSpent }
        }
      } else {
        return state
      }
    }
    case ADD_SUM_TO_INVOICE: {
      return {
        ...state,
        invoice: {
          ...state.invoice,
          [action.payload.invoice]: {
            ...state.invoice[action.payload.invoice],
            balance: state.invoice[action.payload.invoice].balance + parseFloat(action.payload.sum)
          }
        }
      }
    }
    default: return state
  }
}
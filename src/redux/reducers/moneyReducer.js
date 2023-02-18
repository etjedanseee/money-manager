import { dateToString } from "../../utils/calcDate"
import { ADD_NEW_CATEGORY, ADD_NEW_INVOICE, ADD_NEW_OPERATION, ADD_SUM_TO_INVOICE, DECREASE_SUM_INVOICE, DELETE_CATEGORY, DELETE_INVOICE, EDIT_CATEGORY, EDIT_INVOICE, EDIT_OPERATION, SET_FILTER_INVOICE_BY, SET_SORTED_SPENT, TOGGLE_IS_EDIT_CATEGORIES, WRITE_OFF } from "../actions/actionsConsts"
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
    case ADD_NEW_OPERATION: {
      const date = dateToString(action.payload.date)
      const operation = {
        sum: parseFloat(action.payload.sum),
        payWith: action.payload.payWith,
        description: action.payload.description,
        id: action.payload.id,
        category: action.payload.category
      }
      const newSpent = state.spent[date] ? [...state.spent[date], operation] : [operation]
      return {
        ...state,
        spent: {
          ...state.spent,
          [date]: newSpent
        },
        invoice: {
          ...state.invoice,
          [operation.payWith]: {
            ...state.invoice[operation.payWith],
            balance: state.invoice[operation.payWith].balance - operation.sum
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
    case DECREASE_SUM_INVOICE: {
      return {
        ...state,
        invoice: {
          ...state.invoice,
          [action.payload.invoice]: {
            ...state.invoice[action.payload.invoice],
            balance: state.invoice[action.payload.invoice].balance - parseFloat(action.payload.sum)
          }
        }
      }
    }
    case WRITE_OFF: {
      return {
        ...state,
        invoice: {
          ...state.invoice,
          [action.payload.from]: {
            ...state.invoice[action.payload.from],
            balance: state.invoice[action.payload.from].balance - parseFloat(action.payload.sum)
          },
          [action.payload.to]: {
            ...state.invoice[action.payload.to],
            balance: state.invoice[action.payload.to].balance + parseFloat(action.payload.sum)
          }
        }
      }
    }
    case EDIT_OPERATION: {
      const [editedOp, operation] = action.payload
      const prevDate = dateToString(new Date(operation.date))
      const newDate = dateToString(editedOp.date)
      const oper = {
        sum: parseFloat(editedOp.sum),
        payWith: editedOp.payWith,
        category: editedOp.category,
        id: editedOp.id,
        description: editedOp.description
      }
      if (prevDate !== newDate) {
        const prevDateSpent = [...state.spent[prevDate]].filter(op => op.id !== editedOp.id)
        return {
          ...state,
          spent: {
            ...state.spent,
            [prevDate]: [...prevDateSpent],
            [newDate]: [oper, ...state.spent[newDate]]
          }
        }
      } else {
        const prevSpent = [...state.spent[newDate]].filter(op => op.id !== editedOp.id)
        return {
          ...state,
          spent: {
            ...state.spent,
            [newDate]: [oper, ...prevSpent]
          }
        }
      }
    }

    default: return state
  }
}
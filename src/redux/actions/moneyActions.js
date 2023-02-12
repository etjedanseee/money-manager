import { ADD_SPEND, SET_FILTER_INVOICE_BY, SET_SORTED_SPENT } from "./actionsConsts"

export const addSpend = (data) => {
  return {
    type: ADD_SPEND,
    payload: data
  }
}

export const setSortedSpent = (data) => {
  return {
    type: SET_SORTED_SPENT,
    payload: data
  }
}

export const setFilterInvoiceBy = (filter) => {
  return {
    type: SET_FILTER_INVOICE_BY,
    payload: filter
  }
}
import { ADD_NEW_CATEGORY, ADD_NEW_INVOICE, ADD_SPEND, ADD_SUM_TO_INVOICE, DELETE_CATEGORY, DELETE_INVOICE, EDIT_CATEGORY, EDIT_INVOICE, SET_FILTER_INVOICE_BY, SET_SORTED_SPENT, TOGGLE_IS_EDIT_CATEGORIES } from "./actionsConsts"

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

export const addNewCategory = (data) => {
  return {
    type: ADD_NEW_CATEGORY,
    payload: data
  }
}

export const editCategory = (data) => {
  return {
    type: EDIT_CATEGORY,
    payload: data
  }
}

export const deleteCategory = (category) => {
  return {
    type: DELETE_CATEGORY,
    payload: category
  }
}

export const toggleIsEditCategories = () => {
  return {
    type: TOGGLE_IS_EDIT_CATEGORIES,
  }
}

export const addNewInvoice = (data) => {
  return {
    type: ADD_NEW_INVOICE,
    payload: data
  }
}

export const editInvoice = (data) => {
  return {
    type: EDIT_INVOICE,
    payload: data
  }
}

export const deleteInvoice = (invoice) => {
  return {
    type: DELETE_INVOICE,
    payload: invoice
  }
}

export const addSumToInvoice = (data) => {
  return {
    type: ADD_SUM_TO_INVOICE,
    payload: data
  }
}
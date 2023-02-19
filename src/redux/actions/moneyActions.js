import { ADD_NEW_CATEGORY, ADD_NEW_INVOICE, ADD_NEW_OPERATION, ADD_SUM_TO_INVOICE, DECREASE_SUM_INVOICE, DELETE_CATEGORY, DELETE_INVOICE, DELETE_OPERATION, EDIT_CATEGORY, EDIT_INVOICE, EDIT_OPERATION, SET_FILTER_INVOICE_BY, SET_SORTED_SPENT, TOGGLE_IS_EDIT_CATEGORIES, WRITE_OFF } from "./actionsConsts"

export const addNewOperation = (data) => {
  return {
    type: ADD_NEW_OPERATION,
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

export const decreaseSumInvoice = (data) => {
  return {
    type: DECREASE_SUM_INVOICE,
    payload: data
  }
}

export const editOperation = (data) => {
  return {
    type: EDIT_OPERATION,
    payload: data
  }
}

export const deleteOperation = (data) => {
  return {
    type: DELETE_OPERATION,
    payload: data
  }
}
import { ADD_NEW_CATEGORY, ADD_SPEND, DELETE_CATEGORY, EDIT_CATEGORY, SET_FILTER_INVOICE_BY, SET_SORTED_SPENT, TOGGLE_IS_EDIT_CATEGORIES } from "./actionsConsts"

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
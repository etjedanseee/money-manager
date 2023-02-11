import { ADD_SPEND, SET_SORTED_SPENT } from "./actionsConsts"

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
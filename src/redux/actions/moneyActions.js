import { ADD_SPEND } from "./actionsConsts"

export const addSpend = (data) => {
  return {
    type: ADD_SPEND,
    payload: data
  }
}
import { SET_SELECTED_DATE, SET_TYPE_DATE_NAME } from "./actionsConsts"

export const setSelectedDate = (date) => {
  return {
    type: SET_SELECTED_DATE,
    payload: date
  }
}

export const setTypeDateName = (name) => {
  return {
    type: SET_TYPE_DATE_NAME,
    payload: name
  }
}

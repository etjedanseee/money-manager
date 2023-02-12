import { PREV_OR_NEXT_SELECTED_DATE, SET_SELECTED_DATE, SET_TYPE_DATE_NAME } from "./actionsConsts"

export const setSelectedDate = (date) => {
  return {
    type: SET_SELECTED_DATE,
    payload: date
  }
}

export const setTypeDateName = (data) => {
  return {
    type: SET_TYPE_DATE_NAME,
    payload: data
  }
}

export const prevOrNextSelectedDate = (where) => {
  return {
    type: PREV_OR_NEXT_SELECTED_DATE,
    payload: where
  }
}

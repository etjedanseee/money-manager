import { getCurrentDay } from "../../utils/calcDate"
import { SET_SELECTED_DATE, SET_TYPE_DATE_NAME } from "../actions/actionsConsts"

const initialState = {
  selectedDate: [new Date(0), getCurrentDay()],
  typeDateName: 'All time'
}

export const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_DATE: {
      return {
        ...state,
        selectedDate: action.payload,
      }
    }
    case SET_TYPE_DATE_NAME: {
      return {
        ...state,
        typeDateName: action.payload,
      }
    }
    default: return state
  }
}
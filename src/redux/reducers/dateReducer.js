import { SET_SELECTED_DATE, SET_TYPE_DATE_NAME } from "../actions/actionsConsts"

const initialState = {
  selectedDate: [new Date(0), new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())],
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
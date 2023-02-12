import { getCurrentDay, getDayName, getMonthName, getRangeName, getWeekName, getYearName } from "../../utils/calcDate"
import { PREV_OR_NEXT_SELECTED_DATE, SET_SELECTED_DATE, SET_TYPE_DATE_NAME } from "../actions/actionsConsts"

const initialState = {
  selectedDate: [new Date(0), getCurrentDay()],
  typeDateName: 'All time',
  typeDate: 'all time'
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
        typeDateName: action.payload[0],
        typeDate: action.payload[1]
      }
    }
    case PREV_OR_NEXT_SELECTED_DATE: {
      let newSelectedDate;
      const date = state.selectedDate
      switch (state.typeDate) {
        case 'all time':
          return state
        case 'day': {
          newSelectedDate = action.payload === '+'
            ? new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
            : new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
          return {
            ...state,
            selectedDate: newSelectedDate,
            typeDateName: getDayName(newSelectedDate)
          }
        }
        case 'today': {
          newSelectedDate = action.payload === '+'
            ? new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
            : new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
          return {
            ...state,
            selectedDate: newSelectedDate,
            typeDateName: getDayName(newSelectedDate)
          }
        }
        case 'week': {
          const date1 = action.payload === '+'
            ? new Date(date[0].getFullYear(), date[0].getMonth(), date[0].getDate() + 7)
            : new Date(date[0].getFullYear(), date[0].getMonth(), date[0].getDate() - 7)
          const date2 = action.payload === '+'
            ? new Date(date[1].getFullYear(), date[1].getMonth(), date[1].getDate() + 7)
            : new Date(date[1].getFullYear(), date[1].getMonth(), date[1].getDate() - 7)
          return {
            ...state,
            selectedDate: [date1, date2],
            typeDateName: getWeekName(date1, date2)
          }
        }
        case 'year': {
          const date1 = action.payload === '+'
            ? new Date(date[0].getFullYear() + 1, date[0].getMonth(), date[0].getDate())
            : new Date(date[0].getFullYear() - 1, date[0].getMonth(), date[0].getDate())
          const date2 = action.payload === '+'
            ? new Date(date[1].getFullYear() + 1, date[1].getMonth(), date[1].getDate())
            : new Date(date[1].getFullYear() - 1, date[1].getMonth(), date[1].getDate())
          return {
            ...state,
            selectedDate: [date1, date2],
            typeDateName: getYearName(date1)
          }
        }
        case 'month': {
          const date1 = action.payload === '+'
            ? new Date(date[0].getFullYear(), date[0].getMonth() + 1, date[0].getDate())
            : new Date(date[0].getFullYear(), date[0].getMonth() - 1, date[0].getDate())
          const date2 = action.payload === '+'
            ? new Date(date[1].getFullYear(), date[1].getMonth() + 1, date[1].getDate())
            : new Date(date[1].getFullYear(), date[1].getMonth() - 1, date[1].getDate())
          return {
            ...state,
            selectedDate: [date1, date2],
            typeDateName: getMonthName(date1)
          }
        }
        case 'range': {
          const date1 = action.payload === '+'
            ? new Date(+date[0] + (date[1] - date[0]))
            : new Date(+date[0] - (date[1] - date[0]))
          const date2 = action.payload === '+'
            ? new Date(+date[1] + (date[1] - date[0]))
            : new Date(+date[1] - (date[1] - date[0]))

          return {
            ...state,
            selectedDate: [date1, date2],
            typeDateName: getRangeName(date1, date2)
          }
        }
        default: return state
      }
    }
    default: return state
  }
}
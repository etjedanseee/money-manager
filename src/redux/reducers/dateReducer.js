
const initialState = {
  currentDate: new Date(),
  selectedDate: new Date().toDateString(),
  activeStartDate: new Date()
}

export const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    default: return state
  }
}
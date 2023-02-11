
const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


export const dateToString = (date) => {
  let str = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  return str
}

export const getYearRange = () => {
  const date = new Date();
  const d1 = new Date(date.getFullYear(), 0, 1)
  const d2 = new Date(date.getFullYear() + 1, 0, 1)
  return [d1, d2]
}

export const getMonthRange = () => {
  const date = new Date();
  const d1 = new Date(date.getFullYear(), date.getMonth(), 1)
  const d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  return [d1, d2, monthArr[d1.getMonth()]]
}

export const getWeekRange = () => {
  const date = new Date();
  const numDayOfWeek = date.getDay();
  const dayNum = date.getDate();
  const numWeek = Math.round(dayNum / 7)

  const day1 = (numWeek * 7) - numDayOfWeek
  const day2 = (numWeek * 7)

  const d1 = new Date(date.getFullYear(), date.getMonth(), day1)
  const d2 = new Date(date.getFullYear(), date.getMonth(), day2)
  return [d1, d2, day1, day2, monthArr[d1.getMonth()]]
}
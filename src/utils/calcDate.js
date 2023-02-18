
const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const dateToString = (date) => {
  let str = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  return str
}

export const getRangeName = (date1, date2) => {
  return `${date1.toDateString()} - ${date2.toDateString()}`
}

export const getYearName = (date) => {
  return `${date.getFullYear()}`
}

export const getMonthName = (date) => {
  return monthArr[date.getMonth()] + ' ' + getYearName(date)
}

export const getWeekName = (d1, d2) => {
  return `${d1.getDate()}-${d2.getDate()} ${monthArr[d1.getMonth()]}`
}

export const getDayName = (date) => {
  return date.toDateString()
}

export const getYearRange = () => {
  const date = new Date();
  const d1 = new Date(date.getFullYear(), 0, 1)
  const d2 = new Date(date.getFullYear() + 1, 0, 1)
  return [d1, d2, getYearName(d1)]
}

export const getMonthRange = () => {
  const date = new Date();
  const d1 = new Date(date.getFullYear(), date.getMonth(), 1)
  const d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  return [d1, d2, getMonthName(d1)]
}

export const getWeekRange = () => {
  const date = new Date();
  const numDayOfWeek = date.getDay();
  const dayNum = date.getDate();
  const day1 = dayNum - numDayOfWeek
  const day2 = dayNum + (7 - numDayOfWeek - 1)

  const d1 = new Date(date.getFullYear(), date.getMonth(), day1)
  const d2 = new Date(date.getFullYear(), date.getMonth(), day2)
  return [d1, d2, getWeekName(d1, d2)]
}

export const getCurrentDay = () => {
  return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
}
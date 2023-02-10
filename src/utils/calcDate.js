export const dateToString = (date) => {
  let str = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
  return str
}
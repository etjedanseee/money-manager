export const isStringIncludesOperator = (str) => {
  const operators = ['+', '-', '*', '/']
  for (let op of operators) {
    if (str.includes(op)) {
      return true
    }
  }
  return false
}
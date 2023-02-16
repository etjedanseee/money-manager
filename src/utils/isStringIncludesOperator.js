export const isStringIncludesOperator = (str) => {
  const operators = ['+', '-', '*', '/']
  for (let op of operators) {
    if (str.includes(op)) {
      if (op === '-' && str.lastIndexOf(op) === 0) {
        continue
      }
      return true
    }
  }
  return false
}
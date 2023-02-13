export const calcExpression = (str) => {
  const operators = ['+', '-', '*', '/']
  let operatorPos, operator;
  for (let op of operators) {
    const pos = str.indexOf(op)
    if (pos !== -1) {
      operatorPos = pos
      operator = str.charAt(pos)
      if (pos === str.length - 1) return str
      break
    }
  }

  const number1 = parseFloat(str.slice(0, operatorPos))
  const number2 = parseFloat(str.slice(operatorPos + 1))

  let res = 0
  switch (operator) {
    case '+': {
      res = number1 + number2
      break
    }
    case '-': {
      res = number1 - number2
      break
    }
    case '*': {
      res = number1 * number2
      break
    }
    case '/': {
      if (number2 !== 0) {
        res = number1 / number2
      } else {
        res = number1
      }
      break
    }
    default: return str
  }
  res = parseFloat(res) === parseInt(res) ? parseInt(res).toString() : res.toFixed(2)
  return res
}
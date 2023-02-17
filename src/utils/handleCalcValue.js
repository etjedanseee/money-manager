export const handleCalcValue = (value, callback) => {
  if (value[0] === '0') {
    if (value.length === 2 && value[1] !== '.') {
      callback(value.slice(1))
    } else if (value[1] === '.') {
      callback(value)
    } else {
      callback('0')
    }
  } else {
    callback(value)
  }
}
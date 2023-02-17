import { useEffect, useState } from "react"
import { isStringIncludesOperator } from "../utils/isStringIncludesOperator"

export const useCalculator = (defaultValue = '0') => {
  const [value, setValue] = useState(defaultValue)
  const [isCalcVisible, setIsCalcVisible] = useState(false)
  const [isNeedToCalc, setIsNeedToCalc] = useState(false)

  const handleIsCalcVisible = () => {
    setIsCalcVisible(prev => !prev)
  }

  const handleValue = (value) => {
    if (value[0] === '0') {
      if (value.length === 2 && value[1] !== '.') {
        setValue(value.slice(1))
      } else if (value[1] === '.') {
        setValue(value)
      } else {
        setValue('0')
      }
    } else {
      setValue(value)
    }
  }

  useEffect(() => {
    const bool = isStringIncludesOperator(value)
    setIsNeedToCalc(bool)
  }, [value])

  return [
    value,
    handleValue,
    isCalcVisible,
    handleIsCalcVisible,
    isNeedToCalc,
  ]
}
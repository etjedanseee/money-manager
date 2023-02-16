import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Calculator from '../components/Calculator'
import InvoiceOrCategoryItem from '../components/InvoiceOrCategoryItem'
import { addNewInvoice } from '../redux/actions/moneyActions'
import { isStringIncludesOperator } from '../utils/isStringIncludesOperator'

const NewInvoice = ({ invoice }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [balance, setBalance] = useState('0')
  const [isNeedToCalc, setIsNeedToCalc] = useState(false)

  const onConfirm = (title, titleError, color) => {
    if (!titleError) {
      dispatch(addNewInvoice({ title, balance, color }))
      navigate('/invoice')
    }
  }

  const onClose = () => {
    navigate('/invoice')
  }

  const handleSpendValue = (value) => {
    if (value[0] === '0') {
      if (value.length === 2 && value[1] !== '.') {
        setBalance(value.slice(1))
      } else if (value[1] === '.') {
        setBalance(value)
      } else {
        setBalance('0')
      }
    } else {
      setBalance(value)
    }
  }

  useEffect(() => {
    const bool = isStringIncludesOperator(balance)
    setIsNeedToCalc(bool)
  }, [balance])

  return (
    <>
      <InvoiceOrCategoryItem
        arr={invoice}
        onClose={onClose}
        onConfirm={onConfirm}
        isNew={true}
        defaultTitle=''
        defaultColor='#2503fb'
        type='invoice'
      />
      <div className='w-full'>
        <div className='bg-[#e53872] flex justify-center gap-x-3 px-4 pb-4 text-white'>
          <div className='-mt-[1px] text-2xl leading-none'>Balance:</div>
          <div className='text-2xl leading-none'>{balance}$</div>
        </div>
        <Calculator
          spendValue={balance}
          handleSpendValue={handleSpendValue}
          addNewOperation={() => { }}
          setIsCalendarVisible={() => { }}
          isCalendarVisible={false}
          isNeedToCalc={isNeedToCalc}
        />
      </div>
    </>
  )
}

export default NewInvoice
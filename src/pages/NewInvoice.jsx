import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Calculator from '../components/Calculator'
import InvoiceOrCategoryItem from '../components/InvoiceOrCategoryItem'
import { useCalculator } from '../hooks/useCalculator'
import { addNewInvoice } from '../redux/actions/moneyActions'

const NewInvoice = ({ invoice }) => {
  const [balance, handleBalance, isCalcVisible, handleCalcVisible, isNeedToCalc] = useCalculator('0')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onConfirm = (title, titleError, color) => {
    if (!titleError) {
      dispatch(addNewInvoice({ title, balance, color }))
      navigate('/invoice')
    }
  }

  const onClose = () => {
    navigate('/invoice')
  }

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
          handleSpendValue={handleBalance}
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
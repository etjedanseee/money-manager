import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import InvoiceOrCategoryItem from '../components/InvoiceOrCategoryItem'
import { deleteInvoice, editInvoice } from '../redux/actions/moneyActions'
import Confirm from '../UI/Confirm'
import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg'
import { isStringIncludesOperator } from '../utils/isStringIncludesOperator'
import Calculator from '../components/Calculator'

const EditInvoice = () => {
  const { invoice } = useParams()
  const invoiceArr = useSelector(state => state.money.invoice)
  const [isConfirmVisible, setIsConfirmVisible] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [balance, setBalance] = useState(invoiceArr[invoice]?.balance.toString())
  const [isNeedToCalc, setIsNeedToCalc] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onConfirm = (title, _, color) => {
    dispatch(editInvoice({ invoice, title, color, balance }))
    navigate('/invoice')
  }

  const onClose = () => {
    navigate('/invoice')
  }

  const onDelete = () => {
    setIsConfirmVisible(true)
  }

  const confirmResult = (bool) => {
    setIsDelete(bool)
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

  useEffect(() => {
    if (isDelete) {
      dispatch(deleteInvoice(invoice))
      navigate('/invoice')
    }
  }, [isDelete])

  return (
    <div className='w-full'>
      {isConfirmVisible && (
        <Confirm
          message='If delete invoice all operations with it will be deleted'
          setIsConfirmVisible={setIsConfirmVisible}
          resultCalb={confirmResult}
        />
      )}
      <InvoiceOrCategoryItem
        arr={invoice}
        onClose={onClose}
        onConfirm={onConfirm}
        isNew={false}
        defaultTitle={invoice}
        defaultColor={invoiceArr[invoice]?.color}
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
      <div
        className='flex items-center mt-3 py-3 px-6 gap-x-6 border-b-2 border-t-2 border-gray-400'
        onClick={onDelete}
      >
        <div className='flex-initial'>
          <DeleteIcon className='fill-red-600 h-6 w-full' />
        </div>
        <div className='text-xl font-medium text-red-600'>Delete invoice</div>
      </div>
    </div>
  )
}

export default EditInvoice
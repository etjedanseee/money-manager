import React, { useEffect, useState } from 'react'
import EditIcon from '../assets/icons/edit.svg'
import { ReactComponent as SpinIcon } from '../assets/icons/spin.svg'
import { ReactComponent as TopUpIcon } from '../assets/icons/arrow-back.svg'
import { ReactComponent as OperationsIcon } from '../assets/icons/operations.svg'
import { useNavigate } from 'react-router-dom'
import Calculator from './Calculator'
import { isStringIncludesOperator } from '../utils/isStringIncludesOperator'
import { useDispatch } from 'react-redux'
import { addSumToInvoice, editInvoice, setFilterInvoiceBy } from '../redux/actions/moneyActions'

const InvoiceMenu = ({ currentInvoice, name, handleIsMenuVisible }) => {
  const [isCalculatorVisible, setIsCalculatorVisible] = useState(false)
  const [balance, setBalance] = useState(currentInvoice.balance.toString())
  const [addSum, setAddSum] = useState('0')
  const [isAddSumVisible, setIsAddSumVisible] = useState(false)
  const [isNeedToCalc, setIsNeedToCalc] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  const handleAddSumValue = (value) => {
    if (value[0] === '0') {
      if (value.length === 2 && value[1] !== '.') {
        setAddSum(value.slice(1))
      } else if (value[1] === '.') {
        setAddSum(value)
      } else {
        setAddSum('0')
      }
    } else {
      setAddSum(value)
    }
  }

  const onClose = (e) => {
    if (e.target.classList.contains('absolute')) {
      handleIsMenuVisible()
    }
  }

  const onEditClick = () => {
    navigate('/edit-invoice/' + name)
  }

  const handleIsCalcVisible = () => {
    setIsCalculatorVisible(prev => !prev)
  }

  const handleIsAddSumVisible = () => {
    setIsAddSumVisible(prev => !prev)
  }

  const onBalanceChange = () => {
    dispatch(editInvoice({ invoice: name, title: name, color: currentInvoice.color, balance }))
    handleIsCalcVisible()
  }

  const onAddSumToInvoice = () => {
    dispatch(addSumToInvoice({ invoice: name, sum: addSum }))
    handleIsAddSumVisible()
  }

  const onGoToOperations = () => {
    navigate('/operations')
    dispatch(setFilterInvoiceBy(name))
  }

  useEffect(() => {
    const bool = isStringIncludesOperator(balance)
    setIsNeedToCalc(bool)
  }, [balance])

  return (
    <div
      className='absolute top-0 left-0 w-full bg-black opacity-80 min-h-screen flex justify-center items-end pb-14'
      onClick={onClose}
    >
      <div className='w-full px-2 text-white font-medium opacity-100 relative'>
        <div
          style={{ backgroundColor: currentInvoice.color }}
          className='flex flex-col items-center rounded-lg pb-4 opacity-100'
        >
          <div className='w-full px-4 py-4 text-xl'>{name}</div>
          <div className='text-sm mb-1'>Account balance</div>
          <div className='text-xl'>{currentInvoice.balance}$</div>
        </div>
        <div className='-mt-2 bg-white grid grid-cols-3 grid-rows-2 gap-y-4 text-gray-700 py-4'>
          <div
            className='flex flex-col items-center'
            onClick={onEditClick}
          >
            <div className='flex justify-center items-center bg-yellow-400 p-3 rounded-full'>
              <img src={EditIcon} className='h-6 w-6' alt="" />
            </div>
            <div>Edit</div>
          </div>
          <div
            className='flex flex-col items-center'
            onClick={handleIsCalcVisible}
          >
            <div className='flex justify-center items-center bg-gray-300 p-3 rounded-full'>
              <SpinIcon className='h-6 w-6' />
            </div>
            <div>Balance</div>
          </div>
          <div
            className='flex flex-col items-center'
            onClick={onGoToOperations}
          >
            <div className='flex justify-center items-center bg-blue-400 p-3 rounded-full'>
              <OperationsIcon className='h-6 w-6' />
            </div>
            <div>Operations</div>
          </div>
          <div className='col-start-1 col-end-4 flex items-center justify-around'>
            <div className='flex flex-col items-center'>
              <div
                className='flex justify-center items-center bg-green-300 p-3 rounded-full'
                onClick={handleIsAddSumVisible}
              >
                <TopUpIcon className='h-5 w-5 -rotate-90 fill-green-600' />
              </div>
              <div>Top up</div>
            </div>
            <div className='flex flex-col items-center'>
              <div className='flex justify-center items-center bg-gray-300 p-3 rounded-full'>
                <TopUpIcon className='h-5 w-5 -rotate-180 fill-gray-600' />
              </div>
              <div>Write off</div>
            </div>
          </div>
        </div>
      </div>
      {isCalculatorVisible && (
        <div className='w-full absolute bottom-0 left-0 bg-white text-black'>
          <div className='bg-[#e53872] flex justify-center gap-x-3 px-4 py-4 text-white'>
            <div className='-mt-[1px] text-2xl leading-none'>Balance:</div>
            <div className='text-2xl leading-none'>{balance}$</div>
          </div>
          <Calculator
            spendValue={balance}
            handleSpendValue={handleSpendValue}
            addNewOperation={onBalanceChange}
            setIsCalendarVisible={() => { }}
            isCalendarVisible={false}
            isNeedToCalc={isNeedToCalc}
          />
        </div>
      )}
      {isAddSumVisible && (
        <div className='w-full absolute bottom-0 left-0 bg-white text-black'>
          <div className='bg-[#e53872] flex justify-center gap-x-3 px-4 py-4 text-white'>
            <div className='-mt-[1px] text-2xl leading-none'>Add:</div>
            <div className='text-2xl leading-none'>{addSum}$</div>
          </div>
          <Calculator
            spendValue={addSum}
            handleSpendValue={handleAddSumValue}
            addNewOperation={onAddSumToInvoice}
            setIsCalendarVisible={() => { }}
            isCalendarVisible={false}
            isNeedToCalc={isNeedToCalc}
          />
        </div>
      )}
    </div>
  )
}

export default InvoiceMenu
import React, { useState } from 'react'
import EditIcon from '../assets/icons/edit.svg'
import { ReactComponent as SpinIcon } from '../assets/icons/spin.svg'
import { ReactComponent as TopUpIcon } from '../assets/icons/arrow-back.svg'
import { ReactComponent as OperationsIcon } from '../assets/icons/operations.svg'
import { useNavigate } from 'react-router-dom'
import Calculator from './Calculator'
import { useDispatch } from 'react-redux'
import { addSumToInvoice, decreaseSumInvoice, editInvoice, setFilterInvoiceBy } from '../redux/actions/moneyActions'
import InvoiceList from '../UI/InvoiceList'
import { calcBalance } from '../utils/calcBalance'
import { useCalculator } from '../hooks/useCalculator'

const InvoiceMenu = ({ currentInvoice, name, handleIsMenuVisible, invoice }) => {
  const [balance, handleBalance, isBalanceCalcVisible, handleIsBalanceCalcVisible, isNeedCalcBalance] = useCalculator(currentInvoice.balance.toString())
  const [addSum, handleAddSum, isAddSumCalcVisible, handleIsAddSumCalcVisible, isNeedCalcAddSum] = useCalculator('0')
  const [writeOffSum, handleWriteOffSum, isWriteOffCalcVisible, handleIsWriteOffSumCalcVisible, isNeedCalcWriteOffSum] = useCalculator('0')
  const [toInvoiceName, setToInvoiceName] = useState('')
  const [isWriteOffInvoiceVisible, setIsWriteOffInvoiceVisible] = useState(false)

  const totalBalance = calcBalance(invoice, 'All invoice') - currentInvoice.balance
  const invoiceWithoutCurrent = Object.fromEntries(Object.entries(invoice).filter(inv => inv[0] !== name))

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onClose = (e) => {
    if (e.target.classList.contains('absolute')) {
      handleIsMenuVisible()
    }
  }

  const onEditClick = () => {
    navigate('/edit-invoice/' + name)
  }

  const onBalanceChange = () => {
    dispatch(editInvoice({ invoice: name, title: name, color: currentInvoice.color, balance }))
    handleIsBalanceCalcVisible()
  }

  const onAddSumToInvoice = () => {
    dispatch(addSumToInvoice({ invoice: name, sum: addSum }))
    handleIsAddSumCalcVisible()
  }

  const onGoToOperations = () => {
    navigate('/operations')
    dispatch(setFilterInvoiceBy(name))
  }

  const handleIsWriteOffInvoiceVisible = () => {
    setIsWriteOffInvoiceVisible(prev => !prev)
  }

  const onSelectWriteOf = (selectedInvoice) => {
    handleIsWriteOffInvoiceVisible()
    handleIsWriteOffSumCalcVisible()
    setToInvoiceName(selectedInvoice)
  }

  const onWriteOff = () => {
    dispatch(addSumToInvoice({ invoice: toInvoiceName, sum: writeOffSum }))
    dispatch(decreaseSumInvoice({ invoice: name, sum: writeOffSum }))
    handleIsWriteOffSumCalcVisible()
  }

  return (
    <div
      className='absolute top-0 left-0 w-full bg-black opacity-90 min-h-screen flex flex-col items-center justify-end pb-14'
      onClick={onClose}
    >
      <div className='w-full px-2 text-white font-medium opacity-100 relative flex flex-col'>
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
            onClick={handleIsBalanceCalcVisible}
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
                onClick={handleIsAddSumCalcVisible}
              >
                <TopUpIcon className='h-5 w-5 -rotate-90 fill-green-600' />
              </div>
              <div>Top up</div>
            </div>
            <div
              className='flex flex-col items-center'
              onClick={handleIsWriteOffInvoiceVisible}
            >
              <div className='flex justify-center items-center bg-gray-300 p-3 rounded-full'>
                <TopUpIcon className='h-5 w-5 -rotate-180 fill-gray-600' />
              </div>
              <div>Write off</div>
            </div>
          </div>
        </div>
      </div>
      {isBalanceCalcVisible && (
        <div className='w-full absolute bottom-0 left-0 bg-white text-black'>
          <div className='bg-[#e53872] flex justify-center gap-x-3 px-4 py-4 text-white'>
            <div className='-mt-[1px] text-2xl leading-none'>Balance:</div>
            <div className='text-2xl leading-none'>{balance}$</div>
          </div>
          <Calculator
            spendValue={balance}
            handleSpendValue={handleBalance}
            addNewOperation={onBalanceChange}
            setIsCalendarVisible={() => { }}
            isCalendarVisible={false}
            isNeedToCalc={isNeedCalcBalance}
          />
        </div>
      )}
      {isAddSumCalcVisible && (
        <div className='w-full absolute bottom-0 left-0 bg-white text-black'>
          <div className='bg-[#e53872] flex justify-center gap-x-3 px-4 py-4 text-white'>
            <div className='-mt-[1px] text-2xl leading-none'>Add:</div>
            <div className='text-2xl leading-none'>{addSum}$</div>
          </div>
          <Calculator
            spendValue={addSum}
            handleSpendValue={handleAddSum}
            addNewOperation={onAddSumToInvoice}
            setIsCalendarVisible={() => { }}
            isCalendarVisible={false}
            isNeedToCalc={isNeedCalcAddSum}
          />
        </div>
      )}
      {isWriteOffInvoiceVisible && (
        <div className='w-full mt-5 px-2'>
          <div className='bg-white px-4 py-3'>
            <InvoiceList
              invoice={invoiceWithoutCurrent}
              totalBalance={totalBalance}
              onInvoiceClick={onSelectWriteOf}
              title='To invoice'
            />
          </div>
        </div>
      )}
      {isWriteOffCalcVisible && (
        <div className='w-full absolute bottom-0 left-0 bg-white text-black'>
          <div className='bg-slate-100 text-center py-2 text-[#e53872] text-2xl font-medium'>
            From {name} to {toInvoiceName}
          </div>
          <div className='bg-[#e53872] flex justify-center gap-x-3 px-4 py-4 text-white'>
            <div className='-mt-[1px] text-2xl leading-none'>Write off:</div>
            <div className='text-2xl leading-none'>{writeOffSum}$</div>
          </div>
          <Calculator
            spendValue={writeOffSum}
            handleSpendValue={handleWriteOffSum}
            addNewOperation={onWriteOff}
            setIsCalendarVisible={() => { }}
            isCalendarVisible={false}
            isNeedToCalc={isNeedCalcWriteOffSum}
          />
        </div>
      )}
    </div>
  )
}

export default InvoiceMenu
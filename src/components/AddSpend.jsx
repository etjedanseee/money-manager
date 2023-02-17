import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSpend } from '../redux/actions/moneyActions'
import AddDescription from '../UI/AddDescription'
import Calculator from './Calculator'
import PayWith from './PayWith'
import { useCalculator } from '../hooks/useCalculator'

const AddSpend = ({ setIsAddSpendVisible, category }) => {
  const invoice = useSelector(state => state.money.invoice)

  const [spendValue, handleSpendValue, isCalcVisible, handleIsCalcVisible, isNeedCalcSpendValue] = useCalculator('0')
  const [currentInvoice, setCurrentInvoice] = useState(Object.keys(invoice)[0])
  const [isPayWithVisible, setIsPayWithVisible] = useState(false)
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const handlePayWithVisible = () => {
    setIsPayWithVisible(prev => !prev)
  }

  const handleInvoiceChoose = (invoice) => {
    setCurrentInvoice(invoice)
    setIsPayWithVisible(false)
  }

  const addNewOperation = (date) => {
    const obj = {
      sum: parseFloat(spendValue),
      payWith: currentInvoice,
      category,
      date,
      description,
      id: Date.now()
    }
    if (spendValue !== '0') {
      dispatch(addSpend(obj))
      handleSpendValue('0')
    }
    setIsAddSpendVisible(false)
  }

  const closeAddSpend = (e) => {
    if (e.target.classList.contains('absolute')) {
      setIsAddSpendVisible(false)
    }
  }

  return (
    <div
      className='absolute top-0 min-h-screen w-full bg-black bg-opacity-80 flex flex-col justify-end'
      onClick={e => closeAddSpend(e)}
    >
      <div className='bg-white flex flex-col items-center'>
        <div className='flex justify-between w-full text-white mb-3'>
          <div
            className='bg-[#5c6bc0] flex-1 px-4 py-2'
            onClick={handlePayWithVisible}
          >
            <div className='text-xs'>From the invoice</div>
            <div className='text-xl tracking-wide'>{currentInvoice}</div>
          </div>
          <div className='bg-[#fd4180] flex-1 px-4 py-2'>
            <div className='text-xs'>To category</div>
            <div className='text-xl tracking-wide'>{category}</div>
          </div>
        </div>
        <div className='mb-2 text-[#ff4181] text-2xl font-medium'>{spendValue}$</div>

        <AddDescription description={description} setDescription={setDescription} />

        {isPayWithVisible && (
          <PayWith
            invoice={invoice}
            currentInvoice={currentInvoice}
            handleInvoiceChoose={handleInvoiceChoose}
            handlePayWithVisible={handlePayWithVisible}
            title='Choose with pay'
          />
        )}
        <Calculator
          spendValue={spendValue}
          handleSpendValue={handleSpendValue}
          addNewOperation={addNewOperation}
          setIsCalendarVisible={setIsCalendarVisible}
          isCalendarVisible={isCalendarVisible}
          isNeedToCalc={isNeedCalcSpendValue}
        />
      </div>
    </div>
  )
}

export default AddSpend
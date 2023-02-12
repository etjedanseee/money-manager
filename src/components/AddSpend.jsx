import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSpend } from '../redux/actions/moneyActions'
import AddDescription from './AddDescription'
import Calculator from './Calculator'
import PayWith from './PayWith'

const AddSpend = ({ setIsAddSpendVisible, category }) => {
  const [spendValue, setSpendValue] = useState('0')
  const [invoice, setInvoice] = useState('Cash')
  const [isPayWithVisible, setIsPayWithVisible] = useState(false)
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const [description, setDescription] = useState('')


  const payWithArr = useSelector(state => state.money.money)

  const dispatch = useDispatch()

  const handleSpendValue = (value) => {
    if (value[0] === '0') {
      if (value.length !== 1) {
        setSpendValue(value.slice(1))
      } else {
        setSpendValue('0')
      }
    } else {
      setSpendValue(value)
    }
  }

  const handlePayWithVisible = () => {
    setIsPayWithVisible(prev => !prev)
  }

  const handleInvoiceChoose = (invoice) => {
    setInvoice(invoice)
    setIsPayWithVisible(false)
  }

  const addNewSpent = (date) => {
    const obj = {
      sum: parseInt(spendValue),
      payWith: invoice,
      category,
      date,
      description
    }
    if (spendValue !== '0') {
      dispatch(addSpend(obj))
      setSpendValue('0')
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
        <div className='flex justify-between w-full text-white'>
          <div
            className='bg-[#5c6bc0] flex-1 px-4 py-2'
            onClick={handlePayWithVisible}
          >
            <div className='text-xs'>From the invoice</div>
            <div className='text-xl tracking-wide'>{invoice}</div>
          </div>
          <div className='bg-[#fd4180] flex-1 px-4 py-2'>
            <div className='text-xs'>To category</div>
            <div className='text-xl tracking-wide'>{category}</div>
          </div>
        </div>
        <div className='py-3 text-[#ff4181] text-2xl font-medium'>{spendValue}$</div>

        <AddDescription description={description} setDescription={setDescription} />

        {isPayWithVisible && (
          <PayWith
            payWithArr={payWithArr}
            invoice={invoice}
            handleInvoiceChoose={handleInvoiceChoose}
          />
        )}
        <Calculator
          spendValue={spendValue}
          handleSpendValue={handleSpendValue}
          addNewSpent={addNewSpent}
          setIsCalendarVisible={setIsCalendarVisible}
          isCalendarVisible={isCalendarVisible}
        />
      </div>
    </div>
  )
}

export default AddSpend
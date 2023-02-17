import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddDescription from '../UI/AddDescription'
import Calculator from './Calculator'
import PayWith from './PayWith'
import { useCalculator } from '../hooks/useCalculator'
import SelectCategory from './SelectCategory'

const AddSpend = ({ setIsAddSpendVisible, category, defaultSpendValue, defaultInvoice, defaultDescr, onConfirm, defaultDate, defaultId }) => {
  const { invoice, categories } = useSelector(state => state.money)
  const [spendValue, handleSpendValue, isCalcVisible, handleIsCalcVisible, isNeedCalcSpendValue] = useCalculator(defaultSpendValue)
  const [currentInvoice, setCurrentInvoice] = useState(defaultInvoice)
  const [currentCategory, setCurrentCategory] = useState(category)
  const [isPayWithVisible, setIsPayWithVisible] = useState(false)
  const [isSelectCategoryVisible, setIsSelectCategoryVisible] = useState(false)
  const [description, setDescription] = useState(defaultDescr)
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const [isDateDirty, setIsDateDirty] = useState(false)


  const addNewOperation = (date) => {
    const obj = {
      sum: parseFloat(spendValue),
      payWith: currentInvoice,
      category: currentCategory,
      date: isDateDirty ? date : defaultDate,
      description,
      id: defaultId
    }
    if (spendValue !== '0') {
      onConfirm(obj)
      handleSpendValue('0')
    }
    setIsAddSpendVisible(false)
  }

  const closeAddSpend = (e) => {
    if (e.target.classList.contains('fixed')) {
      setIsAddSpendVisible(false)
    }
  }

  const handlePayWithVisible = () => {
    setIsPayWithVisible(prev => !prev)
  }

  const handleSelectCategoryVisible = () => {
    setIsSelectCategoryVisible(prev => !prev)
  }

  const handleInvoiceChoose = (invoice) => {
    setCurrentInvoice(invoice)
    setIsPayWithVisible(false)
  }

  const handleCategoryChoose = (cat) => {
    setCurrentCategory(cat)
    handleSelectCategoryVisible()
  }

  const handleIsCalendarVisible = () => {
    setIsCalendarVisible(prev => !prev)
    setIsDateDirty(true)
  }

  return (
    <div
      className='fixed top-0 w-full max-w-md h-screen flex flex-col items-center justify-end bg-black bg-opacity-80'
      onClick={closeAddSpend}
    >
      <div className='bg-white w-full flex flex-col items-center'>
        <div className='flex justify-between w-full text-white mb-3'>
          <div
            className='bg-[#5c6bc0] flex-1 px-4 py-2'
            onClick={handlePayWithVisible}
          >
            <div className='text-xs'>From the invoice</div>
            <div className='text-xl tracking-wide'>{currentInvoice}</div>
          </div>
          <div
            className='bg-[#fd4180] flex-1 px-4 py-2'
            onClick={handleSelectCategoryVisible}
          >
            <div className='text-xs'>To category</div>
            <div className='text-xl tracking-wide'>{currentCategory}</div>
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
        {isSelectCategoryVisible && (
          <SelectCategory
            categories={categories}
            currentCategory={currentCategory}
            handleCategoryChoose={handleCategoryChoose}
            handleSelectCategoryVisible={handleSelectCategoryVisible}
            title='Select category'
          />
        )}
        <Calculator
          spendValue={spendValue}
          handleSpendValue={handleSpendValue}
          addNewOperation={addNewOperation}
          setIsCalendarVisible={handleIsCalendarVisible}
          isCalendarVisible={isCalendarVisible}
          isNeedToCalc={isNeedCalcSpendValue}
          defaultDate={defaultDate}
        />
      </div>
    </div>
  )
}

export default AddSpend
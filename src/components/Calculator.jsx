import React from 'react'
import CalendarIcon from '../assets/calculator/calendar.svg'
import CheckmarkIcon from '../assets/calculator/checkmark.svg'
import DecreaseIcon from '../assets/calculator/decrease.svg'
import DeleteIcon from '../assets/calculator/delete.svg'
import DivisionIcon from '../assets/calculator/division.svg'
import MultiplyIcon from '../assets/calculator/multiply.svg'
import PlusIcon from '../assets/calculator/plus.svg'

const Calculator = ({ spendValue, handleSpendValue, addNewSpent }) => {
  const handleCalculator = (value) => {
    switch (value) {
      case '0': {
        handleSpendValue(spendValue + '0')
        break;
      }
      case '1': {
        handleSpendValue(spendValue + '1')
        break;
      }
      case '2': {
        handleSpendValue(spendValue + '2')
        break;
      }
      case '3': {
        handleSpendValue(spendValue + '3')
        break;
      }
      case '4': {
        handleSpendValue(spendValue + '4')
        break;
      }
      case '5': {
        handleSpendValue(spendValue + '5')
        break;
      }
      case '6': {
        handleSpendValue(spendValue + '6')
        break;
      }
      case '7': {
        handleSpendValue(spendValue + '7')
        break;
      }
      case '8': {
        handleSpendValue(spendValue + '8')
        break;
      }
      case '9': {
        handleSpendValue(spendValue + '9')
        break;
      }
      case '/': {
        handleSpendValue(spendValue + '/')
        break;
      }
      case 'd': {
        console.log(spendValue.length)
        if (spendValue.length <= 1) {
          handleSpendValue('0')
        } else {
          handleSpendValue(spendValue.slice(0, -1))
        }
        break;
      }
      //если не надо считать диспатчить
      case 'a': {
        addNewSpent()
        break;
      }
      default: return
    }
  }

  return (
    <div className='w-full grid grid-rows-4 grid-cols-5 '>
      <div className='flex justify-center items-center border-2 border-gray-400 py-3' onClick={() => handleCalculator('/')}><img src={DivisionIcon} className='h-8' alt="" /></div>
      <div className='flex justify-center items-center border-2 border-gray-400 py-3' onClick={() => handleCalculator('7')}>7</div>
      <div className='flex justify-center items-center border-2 border-gray-400 py-3' onClick={() => handleCalculator('8')}>8</div>
      <div className='flex justify-center items-center border-2 border-gray-400 py-3' onClick={() => handleCalculator('9')}>9</div>
      <div className='flex justify-center items-center border-2 border-gray-400 py-3' onClick={() => handleCalculator('d')}><img src={DeleteIcon} className='h-8' alt="" /></div>
      <div className='flex justify-center items-center border-2 border-gray-400 py-3'><img src={MultiplyIcon} className='h-8' alt="" /></div>
      <div className='flex justify-center items-center border-2 border-gray-400 py-3' onClick={() => handleCalculator('4')}>4</div>
      <div className='flex justify-center items-center border-2 border-gray-400 py-3' onClick={() => handleCalculator('5')}>5</div>
      <div className='flex justify-center items-center border-2 border-gray-400 py-3' onClick={() => handleCalculator('6')}>6</div>
      <div className='flex justify-center items-center border-2 border-gray-400 py-3'><img src={CalendarIcon} className='h-8' alt="" /></div>
      <div className='flex justify-center items-center border-2 border-gray-400 py-3'><img src={DecreaseIcon} className='h-8' alt="" /></div>
      <div className='flex justify-center items-center border-2 border-gray-400 py-3' onClick={() => handleCalculator('1')}>1</div>
      <div className='flex justify-center items-center border-2 border-gray-400 py-3' onClick={() => handleCalculator('2')}>2</div>
      <div className='flex justify-center items-center border-2 border-gray-400 py-3' onClick={() => handleCalculator('3')}>3</div>
      <div onClick={() => handleCalculator('a')} className='flex justify-center items-center row-start-3 row-end-5 col-start-5 bg-[#ff4181] border-2 border-gray-400 py-3'>
        <img src={CheckmarkIcon} className='h-8 ' alt="" />
      </div>
      <div className='flex justify-center items-center border-2 border-gray-400 py-3'><img src={PlusIcon} className='h-8 ' alt="" /></div>
      <div className='border-2 border-gray-400 py-3'></div>
      <div className='flex justify-center items-center border-2 border-gray-400 py-3' onClick={() => handleCalculator('0')}>0</div>
      <div className='flex justify-center items-center border-2 border-gray-400 py-3'>,</div>
    </div>
  )
}

export default Calculator
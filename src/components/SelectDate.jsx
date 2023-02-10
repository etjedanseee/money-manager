import React from 'react'
import CalendarIcon from '../assets/calculator/calendar.svg'

const SelectDate = ({ handleIsCalendarVisible, handleIsSelectDateVisible }) => {

  //переделать онклик на выборе даты (нужно передавать флаг диапазон или день)
  return (
    <div className='absolute top-0 left-0 px-6 h-screen w-full bg-black bg-opacity-90 flex items-center justify-center'>
      <div className='w-full bg-white rounded-xl text-center grid grid-cols-2 grid-rows-4 text-black'>
        <div className='col-start-1 col-end-3 flex flex-col items-center py-2 border-b-2 border-gray-300'>
          <img src={CalendarIcon} className='h-6' alt="" />
          <div className='text-lg'>Select range</div>
        </div>
        <div className='flex flex-col items-center py-2 border-r-2 border-b-2 border-gray-300'>
          <div className='bg-zinc-700 text-white px-2 rounded-md'>∞</div>
          <div>All time</div>
        </div>
        <div className='flex flex-col items-center py-2 border-b-2 border-gray-300' onClick={() => { handleIsCalendarVisible(); handleIsSelectDateVisible() }}>
          <div className='bg-zinc-700 text-white px-2 rounded-md'>day</div>
          <div>Select day</div>
        </div>
        <div className='flex flex-col items-center py-2 border-r-2 border-b-2 border-gray-300'>
          <div className='bg-zinc-700 text-white px-2 rounded-md'>7</div>
          <div>Week</div>
        </div>
        <div className='flex flex-col items-center py-2 border-b-2 border-gray-300'>
          <div className='bg-zinc-700 text-white px-2 rounded-md'>1</div>
          <div>Today</div>
        </div>
        <div className='flex flex-col items-center py-2 border-r-2  border-gray-300'>
          <div className='bg-zinc-700 text-white px-2 rounded-md'>365</div>
          <div>Year</div>
        </div>
        <div className='flex flex-col items-center py-2 border-l-2 border-l-gray-100 '>
          <div className='bg-zinc-700 text-white px-2 rounded-md'>31</div>
          <div>Month</div>
        </div>
      </div>
    </div>
  )
}

export default SelectDate
import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getCurrentDay } from '../utils/calcDate';

const CalendarFC = ({ isSelectRange, handleIsCalendarVisible }) => {
  const [date, setDate] = useState(getCurrentDay());

  const sendDate = () => {
    handleIsCalendarVisible(date)
  }

  return (
    <div
      className='absolute top-0 left-0 px-6 h-screen w-full bg-black bg-opacity-90 flex items-center justify-center'>
      <div className='bg-white text-black flex flex-col items-center pb-5 rounded-xl'>
        <Calendar
          showNeighboringMonth={false}
          selectRange={isSelectRange}
          className='text-center rounded-xl'
          onChange={setDate}
          value={date}
        />
        {date.length > 0 ? (
          <div className='w-80 text-center my-3 border-2 border-black rounded-md py-2 text-lg'>
            {date[0].toDateString()} | {date[1].toDateString()}
          </div>
        ) : (
          <div className='w-44 text-center my-3 border-2 border-black rounded-md py-2 text-lg'>
            {date.toDateString()}
          </div>
        )}
        <div
          className='text-3xl px-5 pt-1 pb-2 bg-[#ff4181] rounded-md text-white leading-none'
          onClick={sendDate}
        >
          Confirm
        </div>
      </div>
    </div>
  )
}

export default CalendarFC
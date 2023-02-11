import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarFC = ({ isSelectRange, handleIsCalendarVisible }) => {
  const [date, setDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));

  const sendDate = () => {
    handleIsCalendarVisible(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
  }

  return (
    <div className='absolute top-0 left-0 px-6 h-screen w-full bg-black bg-opacity-90 flex items-center justify-center'>
      <div className='bg-white text-black flex flex-col items-center'>
        <Calendar
          showNeighboringMonth={false}
          selectRange={isSelectRange}
          maxDate={new Date()}
          className='text-center'
          onChange={setDate}
          value={date}
        />
        {date.length > 0 ? (
          <p className='text-center '>
            <span className='bold'>Start:</span>{' '}
            {date[0].toDateString()}
            &nbsp;|&nbsp;
            <span className='bold'>End:</span> {date[1].toDateString()}
          </p>
        ) : (
          <p className='text-center'>
            <span className='bold'>Selected date:</span>{' '}
            {date.toDateString()}
          </p>
        )}
        <div className='text-2xl' onClick={sendDate}>Accept</div>
      </div>
    </div>
  )
}

export default CalendarFC
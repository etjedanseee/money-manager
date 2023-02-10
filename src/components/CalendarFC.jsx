import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarFC = ({ selectRange = false, handleIsCalendarVisible }) => {
  const [date, setDate] = useState(new Date());
  // console.log(date)

  const sendDate = () => {
    handleIsCalendarVisible()
    //тут лежит готовая дата
    console.log('SEND DATA', date)
  }

  return (
    <div className='absolute top-0 left-0 px-6 h-screen w-full bg-black bg-opacity-90 flex items-center justify-center'>
      <div className='bg-white text-black flex flex-col items-center'>
        <Calendar
          // activeStartDate={new Date(2017, 0, 1)}
          defaultValue={new Date()}
          showNeighboringMonth={false}
          selectRange={selectRange}
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
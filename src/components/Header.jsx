import React, { useState } from 'react'
import Balance from './Balance'
import CalendarFC from './CalendarFC'
import SelectDate from './SelectDate'

const Header = ({ money, selectedDate }) => {
  const [isSelectDateVisible, setIsSelectDateVisible] = useState(false)
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)

  const handleIsSelectDateVisible = () => {
    setIsSelectDateVisible(prev => !prev)
  }

  const handleIsCalendarVisible = () => {
    setIsCalendarVisible(prev => !prev)
  }

  return (
    <div className='bg-[#5c6bc0] w-full text-white py-2 px-4'>
      <div className='flex justify-between flex-wrap pb-1'>
        <div className='flex-initial'>q</div>
        <div className='flex-1'>
          <Balance money={money} />
        </div>
        <div className='flex-initial'>w</div>
      </div>
      <div
        onClick={handleIsSelectDateVisible}
        className='flex justify-center'
      >
        {selectedDate}
      </div>
      {isSelectDateVisible && (
        <SelectDate
          handleIsCalendarVisible={handleIsCalendarVisible}
          handleIsSelectDateVisible={handleIsSelectDateVisible}
        />
      )}
      {isCalendarVisible && <CalendarFC handleIsCalendarVisible={handleIsCalendarVisible} />}
    </div>
  )
}

export default Header
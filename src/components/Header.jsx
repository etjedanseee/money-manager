import React, { useState } from 'react'
import Balance from './Balance'
import CalendarFC from './CalendarFC'
import SelectDate from './SelectDate'
import { setSelectedDate, setTypeDateName } from '../redux/actions/dateActions';
import { useDispatch } from 'react-redux';


const Header = ({ money, typeDateName }) => {
  const [isSelectDateVisible, setIsSelectDateVisible] = useState(false)
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const [isSelectRange, setIsSelectRange] = useState(false)
  const dispatch = useDispatch()

  const handleIsSelectDateVisible = () => {
    setIsSelectDateVisible(prev => !prev)
  }
  const handleIsCalendarVisible = (date) => {
    setIsCalendarVisible(prev => !prev)
    if (date) {
      if (date.length > 0) {
        const [d1, d2] = date
        dispatch(setTypeDateName(`${d1.toDateString()} - ${d2.toDateString()}`))
      } else {
        dispatch(setTypeDateName(`${date.toDateString()}`))
      }
      dispatch(setSelectedDate(date))
    }
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
        {typeDateName}
      </div>
      {isSelectDateVisible && (
        <SelectDate
          handleIsCalendarVisible={handleIsCalendarVisible}
          handleIsSelectDateVisible={handleIsSelectDateVisible}
          setIsSelectRange={setIsSelectRange}
        />
      )}
      {isCalendarVisible && <CalendarFC handleIsCalendarVisible={handleIsCalendarVisible} isSelectRange={isSelectRange} />}
    </div>
  )

}
export default Header
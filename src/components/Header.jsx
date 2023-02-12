import React, { useState } from 'react'
import CalendarFC from './CalendarFC'
import SelectDate from './SelectDate'
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg'
import { prevOrNextSelectedDate, setSelectedDate, setTypeDateName } from '../redux/actions/dateActions';
import { useDispatch } from 'react-redux';
import { getDayName, getRangeName } from '../utils/calcDate'
import Invoice from './Invoice'


const Header = ({ typeDateName }) => {
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
        dispatch(setTypeDateName([getRangeName(date[0], date[1]), 'range']))
      } else {
        dispatch(setTypeDateName([getDayName(date), 'day']))
      }
      dispatch(setSelectedDate(date))
    }
  }

  const onPrevNextClick = (where) => {
    if (typeDateName !== 'All time') {
      dispatch(prevOrNextSelectedDate(where))
    }
  }

  return (
    <div className='bg-[#5c6bc0] w-full text-white py-2 px-4'>
      <div className='flex justify-between flex-wrap pb-1'>
        <div className='flex-initial'>q</div>
        <div className='flex-1'>
          <Invoice />
        </div>
        <div className='flex-initial'>w</div>
      </div>
      <div className='flex justify-between items-center pb-1'>
        <div
          className='flex-initial -ml-1 mt-1'
          onClick={() => onPrevNextClick('-')}
        >
          <ArrowIcon className='fill-white h-5 w-full' />
        </div>
        <div className='flex-1'>
          <div className='flex justify-center'>
            <div
              onClick={handleIsSelectDateVisible}
              className='px-4'
            >
              {typeDateName}
            </div>
          </div>
        </div>
        <div
          className='flex-initial -mr-1 mt-1'
          onClick={() => onPrevNextClick('+')}
        >
          <ArrowIcon className='fill-white h-5 rotate-180 w-full' />
        </div>
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
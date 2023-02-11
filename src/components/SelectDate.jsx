import React from 'react'
import { useDispatch } from 'react-redux'
import CalendarIcon from '../assets/calculator/calendar.svg'
import { setSelectedDate, setTypeDateName } from '../redux/actions/dateActions';
import { getMonthRange, getWeekRange, getYearRange } from '../utils/calcDate';

const SelectDate = ({ handleIsCalendarVisible, handleIsSelectDateVisible, setIsSelectRange }) => {
  const dispatch = useDispatch()

  const onSelectDayClick = () => {
    setIsSelectRange(false)
    handleIsCalendarVisible()
    handleIsSelectDateVisible()
  }

  const onSelectRangeClick = () => {
    setIsSelectRange(true)
    handleIsCalendarVisible()
    handleIsSelectDateVisible()
  }

  const onAllTimeClick = () => {
    dispatch(setSelectedDate([new Date(0), new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())]))
    dispatch(setTypeDateName('All time'))
    handleIsSelectDateVisible()
  }

  const onTodayClick = () => {
    dispatch(setSelectedDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())))
    dispatch(setTypeDateName('Today'))
    handleIsSelectDateVisible()
  }

  const onYearClick = () => {
    const date = getYearRange()
    const startYear = date[0].getFullYear()
    dispatch(setSelectedDate(date))
    dispatch(setTypeDateName(startYear))
    handleIsSelectDateVisible()
  }

  const onMonthClick = () => {
    const date = getMonthRange()
    const month = date[2]
    dispatch(setSelectedDate([date[0], date[1]]))
    dispatch(setTypeDateName(month))
    handleIsSelectDateVisible()
  }

  const onWeekClick = () => {
    const [date1, date2, day1, day2, month] = getWeekRange()
    dispatch(setSelectedDate([date1, date2]))
    dispatch(setTypeDateName(`${day1}-${day2} ${month}`))
    handleIsSelectDateVisible()
  }

  return (
    <div className='absolute top-0 left-0 px-6 h-screen w-full bg-black bg-opacity-90 flex items-center justify-center'>
      <div className='w-full bg-white rounded-xl text-center grid grid-cols-2 grid-rows-4 text-black'>
        <div
          onClick={onSelectRangeClick}
          className='col-start-1 col-end-3 flex flex-col items-center py-2 border-b-2 border-gray-300'
        >
          <img src={CalendarIcon} className='h-6' alt="" />
          <div className='text-lg'>Select range</div>
        </div>
        <div
          className='flex flex-col items-center py-2 border-r-2 border-b-2 border-gray-300'
          onClick={onAllTimeClick}
        >
          <div className='bg-zinc-700 text-white px-2 rounded-md'>∞</div>
          <div>All time</div>
        </div>
        <div
          className='flex flex-col items-center py-2 border-b-2 border-gray-300'
          onClick={onSelectDayClick}
        >
          <div className='bg-zinc-700 text-white px-2 rounded-md'>day</div>
          <div>Select day</div>
        </div>
        <div
          className='flex flex-col items-center py-2 border-r-2 border-b-2 border-gray-300'
          onClick={onWeekClick}
        >
          <div className='bg-zinc-700 text-white px-2 rounded-md'>7</div>
          <div>Week</div>
        </div>
        <div
          className='flex flex-col items-center py-2 border-b-2 border-gray-300'
          onClick={onTodayClick}
        >
          <div className='bg-zinc-700 text-white px-2 rounded-md'>1</div>
          <div>Today</div>
        </div>
        <div
          className='flex flex-col items-center py-2 border-r-2  border-gray-300'
          onClick={onYearClick}
        >
          <div className='bg-zinc-700 text-white px-2 rounded-md'>365</div>
          <div>Year</div>
        </div>
        <div
          className='flex flex-col items-center py-2 border-l-2 border-l-gray-100'
          onClick={onMonthClick}
        >
          <div className='bg-zinc-700 text-white px-2 rounded-md'>31</div>
          <div>Month</div>
        </div>
      </div>
    </div>
  )
}

export default SelectDate
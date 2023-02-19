import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CalendarIcon from '../assets/calculator/calendar.svg'
import { setSelectedDate, setTypeDateName } from '../redux/actions/dateActions';
import { getCurrentDay, getDayName, getMonthRange, getWeekRange, getYearRange } from '../utils/calcDate';

const SelectDate = ({ handleIsCalendarVisible, handleIsSelectDateVisible, setIsSelectRange }) => {
  const dispatch = useDispatch()
  const { typeDate } = useSelector(state => state.date)

  const closeSelectDate = (e) => {
    if (e.target.classList.contains('absolute')) {
      handleIsSelectDateVisible()
    }
  }

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
    dispatch(setSelectedDate([new Date(0), getCurrentDay()]))
    dispatch(setTypeDateName(['All time', 'all time']))
    handleIsSelectDateVisible()
  }

  const onTodayClick = () => {
    dispatch(setSelectedDate(getCurrentDay()))
    dispatch(setTypeDateName([getDayName(getCurrentDay()), 'today']))
    handleIsSelectDateVisible()
  }

  const onYearClick = () => {
    const date = getYearRange()
    dispatch(setSelectedDate(date))
    dispatch(setTypeDateName([date[2], 'year']))
    handleIsSelectDateVisible()
  }

  const onMonthClick = () => {
    const date = getMonthRange()
    dispatch(setSelectedDate([date[0], date[1]]))
    dispatch(setTypeDateName([date[2], 'month']))
    handleIsSelectDateVisible()
  }

  const onWeekClick = () => {
    const [date1, date2, weekTypeName] = getWeekRange()
    dispatch(setSelectedDate([date1, date2]))
    dispatch(setTypeDateName([weekTypeName, 'week']))
    handleIsSelectDateVisible()
  }

  return (
    <div
      className='absolute top-0 left-0 px-6 max-[375px]:px-3 h-screen w-full bg-black bg-opacity-80 flex items-center justify-center'
      onClick={e => closeSelectDate(e)}
    >
      <div className='w-full bg-white rounded-xl text-center grid grid-cols-2 grid-rows-4 text-black'>
        <div
          onClick={onSelectRangeClick}
          className={`${typeDate === 'range' ? 'bg-[#5c6bc0] text-white font-medium' : 'bg-white text-black'} 
          col-start-1 col-end-3 flex flex-col items-center py-2 border-b-2 border-gray-300`}
        >
          <img src={CalendarIcon} className='h-6' alt="" />
          <div className='text-lg'>Select range</div>
        </div>
        <div
          className={`${typeDate === 'all time' ? 'bg-[#5c6bc0] text-white font-medium' : 'bg-white text-black'} 
          flex flex-col items-center py-2 border-r-2 border-b-2 border-gray-300`}
          onClick={onAllTimeClick}
        >
          <div className='bg-zinc-700 text-white px-2 rounded-md'>∞</div>
          <div>All time</div>
        </div>
        <div
          className={`${typeDate === 'day' ? 'bg-[#5c6bc0] text-white font-medium' : 'bg-white text-black'}
          flex flex-col items-center py-2 border-b-2 border-gray-300`}
          onClick={onSelectDayClick}
        >
          <div className='bg-zinc-700 text-white px-2 rounded-md'>day</div>
          <div>Select day</div>
        </div>
        <div
          className={`${typeDate === 'week' ? 'bg-[#5c6bc0] text-white font-medium' : 'bg-white text-black'}
          flex flex-col items-center py-2 border-r-2 border-b-2 border-gray-300`}
          onClick={onWeekClick}
        >
          <div className='bg-zinc-700 text-white px-2 rounded-md'>7</div>
          <div>Week</div>
        </div>
        <div
          className={`${typeDate === 'today' ? 'bg-[#5c6bc0] text-white font-medium' : 'bg-white text-black'}
          flex flex-col items-center py-2 border-b-2 border-gray-300`}
          onClick={onTodayClick}
        >
          <div className='bg-zinc-700 text-white px-2 rounded-md'>1</div>
          <div>Today</div>
        </div>
        <div
          className={`${typeDate === 'year' ? 'bg-[#5c6bc0] text-white font-medium' : 'bg-white text-black'}
          flex flex-col items-center py-2 border-r-2  border-gray-300`}
          onClick={onYearClick}
        >
          <div className='bg-zinc-700 text-white px-2 rounded-md'>365</div>
          <div>Year</div>
        </div>
        <div
          className={`${typeDate === 'month' ? 'bg-[#5c6bc0] text-white font-medium' : 'bg-white text-black'}
          flex flex-col items-center py-2 border-l-2 border-l-gray-100`}
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
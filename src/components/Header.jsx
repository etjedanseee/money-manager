import React, { useState } from 'react'
import CalendarFC from './CalendarFC'
import SelectDate from './SelectDate'
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg'
import { ReactComponent as EditIcon } from '../assets/icons/edit.svg'
import { ReactComponent as ArrowBack } from '../assets/icons/arrow-back.svg'
import { prevOrNextSelectedDate, setSelectedDate, setTypeDateName } from '../redux/actions/dateActions';
import { useDispatch } from 'react-redux';
import { getDayName, getRangeName } from '../utils/calcDate'
import Invoice from './Invoice'
import { toggleIsEditCategories } from '../redux/actions/moneyActions'


const Header = ({ typeDateName, isEditCategories }) => {
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

  const handleEditCategories = () => {
    dispatch(toggleIsEditCategories())
  }

  return (
    <div className='fixed top-0 max-w-md bg-[#5c6bc0] w-full text-white py-2 px-4'>
      {isEditCategories ? (
        <div className='flex justify-between items-center flex-wrap pt-1 gap-x-6 pb-8'>
          <div
            className='flex-initial'
            onClick={handleEditCategories}
          >
            <ArrowBack className='fill-slate-200 h-6 w-6' />
          </div>
          <div className='flex-1'>
            <div className='text-2xl'>Edit categories</div>
          </div>
        </div>
      )
        : (
          <>
            <div className='flex justify-between items-center flex-wrap pb-1'>
              <div className='flex-initial w-5 h-5'></div>
              <div className='flex-1'>
                <Invoice />
              </div>
              <div
                className='flex-initial'
                onClick={handleEditCategories}
              >
                <EditIcon className='h-5 w-full' />
              </div>
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
          </>)
      }
    </div>
  )
}
export default Header
import React, { useEffect, useRef, useState } from 'react'
import CalendarFC from './CalendarFC'
import SelectDate from './SelectDate'
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg'
import { ReactComponent as EditIcon } from '../assets/icons/edit.svg'
import { ReactComponent as ArrowBack } from '../assets/icons/arrow-back.svg'
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'
import { prevOrNextSelectedDate, setSelectedDate, setTypeDateName } from '../redux/actions/dateActions';
import { useDispatch } from 'react-redux';
import { getCurrentDay, getDayName, getRangeName } from '../utils/calcDate'
import Invoice from './Invoice'
import { toggleIsEditCategories } from '../redux/actions/moneyActions'


const Header = ({ typeDateName, isEditCategories, isSearchVisible, handleIsSearchVisible, isSearchButton, handleSearchOperations }) => {
  const [isSelectDateVisible, setIsSelectDateVisible] = useState(false)
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const [isSelectRange, setIsSelectRange] = useState(false)
  const searchRef = useRef(null)
  const dispatch = useDispatch()
  const currentDay = getCurrentDay()

  const handleIsSelectDateVisible = () => {
    setIsSelectDateVisible(prev => !prev)
  }

  const handleIsCalendarVisible = (date) => {
    setIsCalendarVisible(prev => !prev)
    if (date) {
      if (date?.length > 0) {
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

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === 'Enter') {
        handleSearchOperations(searchRef.current.value)
      }
    }
    window.addEventListener('keydown', handleEnter)
    return () => {
      window.removeEventListener('keydown', handleEnter)
    }
  }, [])

  useEffect(() => {
    if (isSearchVisible) {
      searchRef.current.focus()
    }
  }, [isSearchVisible])

  return (
    <>
      {isSearchVisible && (
        <div className='fixed top-0 max-w-md w-full z-10 bg-opacity-100 bg-[#5c6bc0] text-white flex items-center px-4'>
          <div className='w-full flex justify-between items-center flex-wrap  gap-x-6 pt-4 pb-8'>
            <div
              className='flex-initial -mb-1'
              onClick={handleIsSearchVisible}
            >
              <ArrowBack className='fill-slate-200 h-6 w-6' />
            </div>
            <div className='flex-1'>
              <input
                type='text'
                className='text-xl outline-none bg-transparent w-full'
                placeholder='Search...'
                spellCheck={false}
                ref={searchRef}
              />
            </div>
            <div className='flex-initial'>
              <div
                className='border-2 border-white py-1 px-3 rounded-md'
                onClick={() => handleSearchOperations(searchRef.current.value)}
              >
                Search
              </div>
            </div>
          </div>
        </div>
      )}
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
                {isSearchButton ? (
                  <div
                    className='flex-initial'
                    onClick={handleIsSearchVisible}
                  >
                    <SearchIcon className='h-5 w-5 fill-white' />
                  </div>
                )
                  : <div
                    className='flex-initial'
                    onClick={handleEditCategories}
                  >
                    <EditIcon className='h-5 w-5 fill-white' />
                  </div>
                }
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
              {isCalendarVisible && (
                <CalendarFC
                  handleIsCalendarVisible={handleIsCalendarVisible}
                  isSelectRange={isSelectRange}
                  defaultDate={isSelectRange ? [currentDay, currentDay] : currentDay}
                />
              )}
            </>
          )
        }
      </div>
    </>
  )
}
export default Header
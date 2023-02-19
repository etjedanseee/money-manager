import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { addNewOperation } from '../redux/actions/moneyActions'
import { getCurrentDay } from '../utils/calcDate'
import AddSpend from './AddSpend'

const Categories = ({ sortedCategories, sortedColors, sortedTotalSum, isEditCategories }) => {
  const [isAddSpendVisible, setIsAddSpendVisible] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)
  const { invoice } = useSelector(state => state.money)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onCategoryClick = (category) => {
    if (isEditCategories) {
      navigate('edit-category/' + category)
    } else {
      setCurrentCategory(category)
      handleIsAddSpendVisible()
    }
  }

  const onAddNewOperation = (obj) => {
    dispatch(addNewOperation(obj))
  }

  const handleIsAddSpendVisible = () => {
    setIsAddSpendVisible(prev => !prev)
  }

  return (
    <>
      {sortedCategories?.length && sortedCategories?.map((cat, i) => (
        <div
          key={cat}
          className='place-self-center flex flex-col justify-center items-center'
          onClick={() => onCategoryClick(cat)}
        >
          <div className='text-lg font-medium text-ellipsis max-w-[90px] truncate overflow-hidden max-[375px]:text-base max-[375px]:max-w-[70px]'>
            {cat}
          </div>
          <div
            style={{ borderColor: sortedColors[i] }}
            className='border-4 rounded-full w-14 h-14 max-[351px]:w-12 max-[351px]:h-12 flex justify-center items-center text-xs font-medium'
          >
            {sortedTotalSum[i] !== 0 ? ` ${sortedTotalSum[i]}$` : '0'}
          </div>
        </div>
      ))}
      {sortedCategories?.length < 12 && (
        <NavLink
          to='/new-category'
          className='place-self-center flex flex-col justify-center items-center -mt-1'
        >
          <div className='text-lg font-medium text-transparent'>new</div>
          <div className='border-2 border-dashed border-gray-500 rounded-full w-14 h-14 max-[351px]:w-12 max-[351px]:h-12 flex justify-center items-center'>
            <div className='text-3xl mb-[6px] text-gray-500'>+</div>
          </div>
        </NavLink>
      )}
      {isAddSpendVisible && (
        <AddSpend
          handleIsAddSpendVisible={handleIsAddSpendVisible}
          category={currentCategory}
          defaultInvoice={Object.keys(invoice)[0]}
          defaultDescr=''
          defaultDate={getCurrentDay()}
          onConfirm={onAddNewOperation}
          isEditOp={false}
          onDelete={() => { }}
          onDuplicate={() => { }}
          id={Date.now()}
        />)}
    </>
  )
}

export default Categories
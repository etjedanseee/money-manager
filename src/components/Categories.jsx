import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AddSpend from './AddSpend'

const Categories = ({ sortedCategories, sortedColors, sortedTotalSum, isEditCategories }) => {
  const [isAddSpendVisible, setIsAddSpendVisible] = useState(false)
  const [currentCategory, setCurrentCategory] = useState('Cafe')
  const navigate = useNavigate()

  const onCategoryClick = (category) => {
    if (isEditCategories) {
      navigate('edit-category/' + category)
    } else {
      setCurrentCategory(category)
      setIsAddSpendVisible(true)
    }
  }

  return (
    <>
      {sortedCategories?.length && sortedCategories?.map((c, i) => (
        <div
          key={c}
          className='place-self-center flex flex-col justify-center items-center'
          onClick={() => onCategoryClick(c)}
        >
          <div className='text-lg font-medium text-ellipsis max-w-[90px] overflow-hidden'>{c}</div>
          <div
            style={{ borderColor: sortedColors[i] }}
            className='border-4 rounded-full w-14 h-14 flex justify-center items-center text-xs font-medium'
          >
            {sortedTotalSum[i] !== 0 ? ` ${sortedTotalSum[i]}$` : '0'}
          </div>
        </div>
      ))}
      {sortedCategories?.length < 12 && (
        <NavLink
          to='/new-category'
          className='place-self-center flex flex-col justify-center items-center'
        >
          <div className='text-lg font-medium text-transparent'>new</div>
          <div className='border-2 border-dashed border-gray-500 rounded-full w-14 h-14 flex justify-center items-center'>
            <div className='text-3xl mb-[6px] text-gray-500'>+</div>
          </div>
        </NavLink>
      )}
      {isAddSpendVisible && <AddSpend setIsAddSpendVisible={setIsAddSpendVisible} category={currentCategory} />}
    </>
  )
}

export default Categories
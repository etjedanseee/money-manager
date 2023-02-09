import React, { useState } from 'react'
import AddSpend from './AddSpend'

const Categories = ({ sortedCategories, sortedColors, sortedTotalSum }) => {
  const [isAddSpendVisible, setIsAddSpendVidible] = useState(false)
  const [currentCategory, setCurrentCategory] = useState('Cafe')

  const onCategoryClick = (category) => {
    setCurrentCategory(category)
    setIsAddSpendVidible(true)
  }

  return (
    <>
      {sortedCategories?.map((c, i) => (
        <div
          key={c}
          className='place-self-center flex flex-col justify-center items-center'
          onClick={() => onCategoryClick(c)}
        >
          <div className='text-lg font-medium'>{c}</div>
          <div
            style={{ borderColor: sortedColors[i] }}
            className='border-4  rounded-full w-14 h-14 flex justify-center items-center text-xs font-medium'
          >
            {sortedTotalSum[i] !== 0 ? ` ${sortedTotalSum[i]}$` : '0'}
          </div>
        </div>
      ))}
      <AddSpend isAddSpendVisible={isAddSpendVisible} setIsAddSpendVidible={setIsAddSpendVidible} category={currentCategory} />
    </>
  )
}

export default Categories
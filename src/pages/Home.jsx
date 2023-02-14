import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Categories from '../components/Categories'
import Diagram from '../components/Diagram'
import Header from '../components/Header'

const Home = ({ typeDateName, sortedCategories, sortedColors, sortedTotalSum, isEditCategories }) => {
  return (
    <>
      <Header
        typeDateName={typeDateName}
        isEditCategories={isEditCategories}
      />
      <div className='grid grid-cols-4 grid-rows-4 grid-flow-row-dense gap-2'>
        <Categories
          sortedCategories={sortedCategories}
          sortedColors={sortedColors}
          sortedTotalSum={sortedTotalSum}
          isEditCategories={isEditCategories}
        />
        <Diagram
          sortedColors={sortedColors}
          sortedTotalSum={sortedTotalSum}
        />
      </div>
    </>
  )
}

export default Home
import React from 'react'
import Categories from '../components/Categories'
import Diagram from '../UI/Diagram'
import Header from '../components/Header'

const Home = ({ typeDateName, sortedCategories, sortedColors, sortedTotalSum, isEditCategories }) => {
  return (
    <div className='pt-20 pb-14 w-full'>
      <Header
        typeDateName={typeDateName}
        isEditCategories={isEditCategories}
        isSearchVisible={false}
        handleIsSearchVisible={() => { }}
        isSearchButton={false}
        handleSearchOperations={() => { }}
      />
      <div className='grid grid-cols-4 grid-rows-4 grid-flow-row-dense gap-2 max-[375px]:gap-1'>
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
    </div>
  )
}

export default Home
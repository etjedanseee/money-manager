import React from 'react'
import Categories from '../components/Categories'
import Diagram from '../components/Diagram'
import Header from '../components/Header'

const Home = ({ invoice, typeDateName, sortedCategories, sortedColors, sortedTotalSum }) => {
  return (
    <>
      <Header
        invoice={invoice}
        typeDateName={typeDateName}
      />
      <div className='grid grid-cols-4 grid-rows-4 grid-flow-row-dense gap-2'>
        <Categories
          sortedCategories={sortedCategories}
          sortedColors={sortedColors}
          sortedTotalSum={sortedTotalSum}
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
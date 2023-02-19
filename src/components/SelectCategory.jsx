import React from 'react'

const SelectCategory = ({ categories, currentCategory, handleCategoryChoose, title, handleSelectCategoryVisible }) => {
  const categoriesKeys = Object.keys(categories)

  const handleCategoryClick = (invoice) => {
    handleCategoryChoose(invoice)
  }

  const closePayWith = (e) => {
    if (e.target.classList.contains('absolute')) {
      handleSelectCategoryVisible()
    }
  }

  return (
    <div
      className='absolute top-0 left-0 h-screen w-full bg-black bg-opacity-80 flex justify-center items-center px-6 max-[376px]:px-3'
      onClick={closePayWith}
    >
      <div className='w-full bg-white text-center rounded-xl'>
        <div className='py-2 text-lg text-black border-b-2 border-black'>{title}</div>
        <div className='grid grid-cols-2 items-center'>
          {categoriesKeys.map(cat => (
            <div
              key={cat}
              className={`${cat === currentCategory ? 'bg-[#5c6bc0]' : 'bg-white'} flex items-center text-start px-4 py-3 gap-x-2`}
              onClick={() => handleCategoryClick(cat)}
            >
              <div className='flex-none w-12 h-10 max-[376px]:w-10 max-[376px]:h-8' style={{ backgroundColor: categories[cat] }}></div>
              <div className={`${cat === currentCategory ? 'text-white' : 'text-black'} `}>
                <div className='text-lg max-[376px]:text-base mb-1 leading-none text-ellipsis max-w-[80px] truncate'>{cat}</div>
              </div>
            </div>))}
        </div>
      </div>
    </div>
  )
}

export default SelectCategory
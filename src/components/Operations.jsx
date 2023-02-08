import React from 'react'

const Operations = () => {
  return (
    <div className='flex justify-center gap-x-4'>
      <div className='border-red-500 border-4 rounded-full w-20 h-20 flex justify-center items-center hover:cursor-pointer hover:border-red-600'>
        <div className='text-red-500 font-bold'>spend</div>
      </div>
      <div className='border-green-500 border-4 rounded-full w-20 h-20 flex justify-center items-center hover:cursor-pointer hover:border-green-600'>
        <div className='text-green-500 font-bold'>income</div>
      </div>
    </div>
  )
}

export default Operations
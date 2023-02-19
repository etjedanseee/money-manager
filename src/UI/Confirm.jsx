import React from 'react'

const Confirm = ({ setIsConfirmVisible, message, resultCalb }) => {
  const onClick = (bool) => {
    setIsConfirmVisible(false)
    resultCalb(bool)
  }

  return (
    <div className='absolute top-2 left-0 w-full z-30 px-5 max-[375px]:px-3'>
      <div className='py-5 px-4 bg-teal-300 flex flex-col justify-center items-center text-center rounded-xl border-2 border-black'>
        <div className='mb-3 text-lg font-medium'>{message}</div>
        <div className='flex items-center gap-x-5 text-xl'>
          <div
            onClick={() => onClick(true)}
            className='bg-green-500 rounded-md px-4 py-2 text-white font-medium'
          >
            Confirm
          </div>
          <div
            onClick={() => onClick(false)}
            className='bg-red-400 rounded-md px-4 py-2 text-white font-medium'
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirm
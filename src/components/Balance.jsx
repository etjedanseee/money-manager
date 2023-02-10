import React from 'react'
import { calcBalance } from '../utils/calcBalance'

const Balance = ({ money }) => {
  const balance = calcBalance(money);

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='text-xs leading-none mb-1'>All invoice</div>
      <div className='text-lg leading-none'>{balance}$</div>
    </div>
  )
}

export default Balance
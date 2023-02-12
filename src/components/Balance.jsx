import React from 'react'
import { calcBalance } from '../utils/calcBalance'

const Balance = ({ invoice, title, filterInvoiceBy, handlePayWithVisible }) => {
  const balance = calcBalance(invoice, filterInvoiceBy);

  return (
    <div
      className='w-full flex flex-col items-center'
      onClick={handlePayWithVisible}
    >
      <div className='text-xs leading-none mb-1'>{title}</div>
      <div className='text-lg leading-none'>{balance}$</div>
    </div>
  )
}

export default Balance
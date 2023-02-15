import React from 'react'
import { useNavigate } from 'react-router-dom'
import { calcBalance } from '../utils/calcBalance'

const InvoiceManager = ({ invoice }) => {
  const totalBalance = calcBalance(invoice, 'All invoice')
  const invoiceKeys = Object.keys(invoice)
  const navigate = useNavigate()

  const onAddInvoice = () => {
    navigate('/new-invoice')
  }

  return (
    <div className='w-full bg-white px-4 py-3'>
      <div className='flex justify-between items-center mb-5'>
        <div className='text-gray-500 uppercase'>Invoice</div>
        <div className={`${totalBalance < 0 ? 'text-red-500' : 'text-gray-700'} text-xl font-medium`}>{totalBalance}$</div>
      </div>
      {invoiceKeys.map(key => (
        <div
          key={key}
          className='flex gap-x-3 mb-3'
        >
          <div className='w-14 h-10 rounded-md' style={{ backgroundColor: invoice[key].color }}></div>
          <div className='w-full leading-none'>
            <div className='mb-1'>{key}</div>
            <div className={`${calcBalance(invoice, key) < 0 ? 'text-red-500' : 'text-gray-700'} mb-3`}
            >
              {invoice[key].sum}$
            </div>
            <div className='h-[2px] bg-gray-300'></div>
          </div>
        </div>
      ))}

      <div
        className='flex items-center gap-x-3 mb-5'
        onClick={onAddInvoice}
      >
        <div className='border-2 border-gray-500 border-dashed w-12 h-10 rounded-md flex justify-center items-center'>
          <div className='text-gray-500 text-2xl mb-1'>+</div>
        </div>
        <div className='mb-1 leading-none'>Add invoice</div>
      </div>
      <div className='h-[2px] bg-gray-300'></div>
    </div>
  )
}

export default InvoiceManager
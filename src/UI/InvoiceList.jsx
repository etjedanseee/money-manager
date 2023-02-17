import React from 'react'

const InvoiceList = ({ invoice, totalBalance, onInvoiceClick, title }) => {
  const invoiceKeys = Object.keys(invoice)

  return (
    <>
      <div className='flex justify-between items-center mb-5'>
        <div className='text-gray-500 uppercase'>{title}</div>
        <div className={`${totalBalance < 0 ? 'text-red-500' : 'text-gray-700'} text-xl font-medium`}>{totalBalance}$</div>
      </div>
      {invoiceKeys.map(key => (
        <div
          key={key}
          className='flex gap-x-3 mb-3'
          onClick={() => onInvoiceClick(key)}
        >
          <div className='w-14 h-10 rounded-md' style={{ backgroundColor: invoice[key].color }}></div>
          <div className='w-full leading-none'>
            <div className='mb-1'>{key}</div>
            <div className={`${invoice[key].balance < 0 ? 'text-red-500' : 'text-gray-700'} mb-3`}
            >
              {invoice[key].balance}$
            </div>
            <div className='h-[2px] bg-gray-300'></div>
          </div>
        </div>
      ))
      }
    </>
  )

}

export default InvoiceList
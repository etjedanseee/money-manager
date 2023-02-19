import React from 'react'

const PayWith = ({ invoice, currentInvoice, handleInvoiceChoose, title, handlePayWithVisible }) => {
  const payWithKeys = Object.keys(invoice)

  const handlePayWithClick = (invoice) => {
    handleInvoiceChoose(invoice)
  }

  const closePayWith = (e) => {
    if (e.target.classList.contains('absolute')) {
      handlePayWithVisible()
    }
  }

  return (
    <div
      className='absolute top-0 left-0 h-screen w-full bg-black bg-opacity-80 flex justify-center items-center px-6 max-[37px]:px-3'
      onClick={closePayWith}
    >
      <div className='w-full bg-white text-center rounded-xl'>
        <div className='py-2 text-lg text-black border-b-2 border-black'>{title}</div>
        {payWithKeys.map(key => (
          <div
            key={key}
            className={`${key === currentInvoice ? 'bg-[#5c6bc0]' : 'bg-white'} flex items-center text-start px-4 py-3 gap-x-2 `}
            onClick={() => handlePayWithClick(key)}
          >
            <div className='w-12 h-10' style={{ backgroundColor: invoice[key].color }}></div>
            <div className={`${key === currentInvoice ? 'text-white' : 'text-black'} `}>
              <div className='text-lg mb-1 leading-none'>{key}</div>
              {invoice[key].balance !== undefined && <div className='text-lg leading-none '>{invoice[key].balance}$</div>}
            </div>
          </div>))}
      </div>
    </div>
  )
}

export default PayWith
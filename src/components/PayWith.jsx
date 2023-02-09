import React from 'react'

const PayWith = ({ payWithArr, invoice, handleInvoiceChoose }) => {
  console.log(payWithArr)
  const payWithKeys = Object.keys(payWithArr)

  const handlePayWithClick = (invoice) => {
    handleInvoiceChoose(invoice)
  }
  return (
    <div className='absolute top-0 h-screen w-full bg-black bg-opacity-90 flex justify-center items-center px-6'>
      <div className='w-full bg-white text-center rounded-xl'>
        <div className='py-2 text-lg'>Choose with account</div>
        {payWithKeys.map(key => (
          <div
            key={key}
            className={`${key === invoice ? 'bg-[#5c6bc0]' : 'bg-white'} flex items-center text-start px-4 py-3 gap-x-2 `}
            onClick={() => handlePayWithClick(key)}
          >
            <div className={`w-12 h-10 ${key === invoice ? 'bg-green-400' : 'bg-yellow-400'} `}></div>
            <div className={`${key === invoice ? 'text-white' : 'text-black'} `}>
              <div className='text-lg mb-1 leading-none'>{key}</div>
              <div className='text-lg leading-none '>{payWithArr[key]}$</div>
            </div>
          </div>))}
      </div>
    </div>
  )
}

export default PayWith
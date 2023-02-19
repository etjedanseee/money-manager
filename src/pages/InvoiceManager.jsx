import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InvoiceList from '../UI/InvoiceList'
import InvoiceMenu from '../components/InvoiceMenu'
import { calcBalance } from '../utils/calcBalance'

const InvoiceManager = ({ invoice }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useState(null)
  const totalBalance = calcBalance(invoice, 'All invoice')

  const navigate = useNavigate()

  const onAddInvoice = () => {
    navigate('/new-invoice')
  }

  const onInvoiceClick = (key) => {
    setCurrentInvoice(key)
    handleIsMenuVisible()
  }

  const handleIsMenuVisible = () => {
    setIsMenuVisible(prev => !prev)
  }

  return (
    <div className='w-full bg-white px-4 py-3'>
      {isMenuVisible && (
        <InvoiceMenu
          currentInvoice={invoice[currentInvoice]}
          invoice={invoice}
          name={currentInvoice}
          handleIsMenuVisible={handleIsMenuVisible}
        />
      )}

      <InvoiceList
        invoice={invoice}
        onInvoiceClick={onInvoiceClick}
        totalBalance={totalBalance}
        title='Invoice'
      />

      {Object.keys(invoice).length < 5 && (
        <>
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
        </>
      )}
    </div>
  )
}

export default InvoiceManager
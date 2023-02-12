import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterInvoiceBy } from '../redux/actions/moneyActions'
import { calcBalance } from '../utils/calcBalance'
import Balance from './Balance'
import PayWith from './PayWith'

const Invoice = () => {
  const { invoice, filterInvoiceBy } = useSelector(state => state.money)
  const [isPayWithVisible, setIsPayWithVisible] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useState('All invoice')
  const dispatch = useDispatch()

  const invoiseAndAllInvoice = {
    'All invoice': calcBalance(invoice, 'All invoice'),
    ...invoice,
  }

  const handleInvoiceChoose = (key) => {
    setCurrentInvoice(key)
    setIsPayWithVisible(false)
    dispatch(setFilterInvoiceBy(key))
  }

  const handlePayWithVisible = () => {
    setIsPayWithVisible(prev => !prev)
  }

  return (
    <div>
      {isPayWithVisible && (
        <PayWith
          invoice={invoiseAndAllInvoice}
          handleInvoiceChoose={handleInvoiceChoose}
          currentInvoice={currentInvoice}
          title='Select invoice to filter'
        />)
      }
      <Balance
        title={filterInvoiceBy}
        invoice={invoice}
        filterInvoiceBy={filterInvoiceBy}
        handlePayWithVisible={handlePayWithVisible}
      />

    </div>
  )
}

export default Invoice
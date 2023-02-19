import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterInvoiceBy } from '../redux/actions/moneyActions'
import { calcBalance } from '../utils/calcBalance'
import Balance from '../UI/Balance'
import PayWith from './PayWith'

const Invoice = () => {
  const { invoice, filterInvoiceBy } = useSelector(state => state.money)
  const [isPayWithVisible, setIsPayWithVisible] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useState(filterInvoiceBy)
  const dispatch = useDispatch()

  const invoiseAndAllInvoice = {
    'All invoice': { balance: calcBalance(invoice, 'All invoice'), color: '#ed752c' },
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
          handlePayWithVisible={handlePayWithVisible}
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
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import InvoiceOrCategoryItem from '../components/InvoiceOrCategoryItem'
import { addNewInvoice } from '../redux/actions/moneyActions'

const NewInvoice = ({ invoice }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [balance, setBalance] = useState(0)

  const onConfirm = (title, titleError, color) => {
    if (!titleError) {
      dispatch(addNewInvoice({ title, balance }))
      navigate('/')
    }
  }

  const onClose = () => {
    navigate('/')
  }

  //add calculator to change balance
  return (
    <>
      <InvoiceOrCategoryItem
        arr={invoice}
        onClose={onClose}
        onConfirm={onConfirm}
        isNew={true}
        defaultTitle=''
        defaultColor='#2503fb'
        type='invoice'
      />
    </>
  )
}

export default NewInvoice
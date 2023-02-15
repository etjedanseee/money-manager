import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addNewCategory } from '../redux/actions/moneyActions'
import InvoiceOrCategoryItem from '../components/InvoiceOrCategoryItem'

const NewCategory = ({ categories }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onConfirm = (title, titleError, color) => {
    if (!titleError) {
      dispatch(addNewCategory({ title, color }))
      navigate('/')
    }
  }

  const onClose = () => {
    navigate('/')
  }

  return (
    <>
      <InvoiceOrCategoryItem
        arr={categories}
        onClose={onClose}
        onConfirm={onConfirm}
        isNew={true}
        defaultTitle=''
        defaultColor='#2503fb'
        type='category'
      />
    </>
  )
}

export default NewCategory
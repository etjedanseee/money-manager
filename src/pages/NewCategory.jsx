import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addNewCategory } from '../redux/actions/moneyActions'
import CategoryItem from '../components/CategoryItem'

const NewCategory = ({ categories }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onConfirm = (title, color, titleError) => {
    if (!titleError) {
      dispatch(addNewCategory({ title, color }))
      navigate('/')
    }
  }

  const onClose = () => {
    navigate('/')
  }

  return (
    <CategoryItem
      categories={categories}
      onClose={onClose}
      onConfirm={onConfirm}
      isNewCategory={true}
      defaultTitle=''
      defaultColor='#4bb98f'
    />
  )
}

export default NewCategory
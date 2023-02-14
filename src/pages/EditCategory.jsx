import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import CategoryItem from '../components/CategoryItem'
import { deleteCategory, editCategory } from '../redux/actions/moneyActions'
import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg'
import Confirm from '../UI/Confirm'

const EditCategory = ({ categories }) => {
  const { category } = useParams()
  const [isConfirmVisible, setIsConfirmVisible] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onConfirm = (title, color) => {
    dispatch(editCategory({ category, title, color }))
    navigate('/')
  }

  const onClose = () => {
    navigate('/')
  }

  const onDelete = () => {
    setIsConfirmVisible(true)
  }

  const confirmResult = (bool) => {
    setIsDelete(bool)
  }

  useEffect(() => {
    if (isDelete) {
      dispatch(deleteCategory(category))
      navigate('/')
    }
  }, [isDelete])

  return (
    <div className='w-full'>
      {isConfirmVisible && (
        <Confirm
          message='If delete category all operations with it will be deleted'
          setIsConfirmVisible={setIsConfirmVisible}
          resultCalb={confirmResult}
        />
      )}
      <CategoryItem
        categories={categories}
        defaultTitle={category}
        defaultColor={categories[category]}
        isNewCategory={false}
        onConfirm={onConfirm}
        onClose={onClose}
      />
      <div
        className='flex items-center mt-3 py-3 px-6 gap-x-6 border-b-2 border-t-2 border-gray-400'
        onClick={onDelete}
      >
        <div className='flex-initial'>
          <DeleteIcon className='fill-red-600 h-6 w-full' />
        </div>
        <div className='text-xl font-medium text-red-600'>Delete category</div>
      </div>
    </div>
  )
}

export default EditCategory
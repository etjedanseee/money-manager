import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import InvoiceOrCategoryItem from '../components/InvoiceOrCategoryItem'
import { deleteInvoice, editInvoice } from '../redux/actions/moneyActions'
import Confirm from '../UI/Confirm'
import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg'

const EditInvoice = ({ invoiceArr }) => {
  const { invoice } = useParams()
  const [isConfirmVisible, setIsConfirmVisible] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onConfirm = (title, _, color) => {
    dispatch(editInvoice({ invoice, title, color }))
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
      dispatch(deleteInvoice(invoice))
      navigate('/')
    }
  }, [isDelete])

  return (
    <div className='w-full'>
      {isConfirmVisible && (
        <Confirm
          message='If delete invoice all operations with it will be deleted'
          setIsConfirmVisible={setIsConfirmVisible}
          resultCalb={confirmResult}
        />
      )}
      <InvoiceOrCategoryItem
        arr={invoice}
        onClose={onClose}
        onConfirm={onConfirm}
        isNew={false}
        defaultTitle={invoice}
        defaultColor={invoiceArr[invoice]?.color}
        type='invoice'
      />

      <div
        className='flex items-center mt-3 py-3 px-6 gap-x-6 border-b-2 border-t-2 border-gray-400'
        onClick={onDelete}
      >
        <div className='flex-initial'>
          <DeleteIcon className='fill-red-600 h-6 w-full' />
        </div>
        <div className='text-xl font-medium text-red-600'>Delete invoice</div>
      </div>
    </div>
  )
}

export default EditInvoice
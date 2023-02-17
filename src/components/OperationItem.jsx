import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editOperation } from '../redux/actions/moneyActions'
import AddSpend from './AddSpend'

//delete useState
const OperationItem = ({ operation, handleIsOperationVisible }) => {
  const [isAddSpendVisible, setIsAddSpendVisible] = useState(false)
  const dispatch = useDispatch()

  const onEditSpend = (obj) => {
    dispatch(editOperation([obj, new Date(operation.date)]))
    handleIsOperationVisible()
  }

  return (
    <AddSpend
      category={operation.category}
      defaultDate={new Date(operation.date)}
      defaultDescr={operation.description || ''}
      defaultInvoice={operation.payWith}
      defaultSpendValue={operation.sum.toString()}
      onConfirm={onEditSpend}
      setIsAddSpendVisible={setIsAddSpendVisible}
      defaultId={operation.id}
    />
  )
}

export default OperationItem
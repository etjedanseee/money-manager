import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editOperation } from '../redux/actions/moneyActions'
import AddSpend from './AddSpend'

const OperationItem = ({ operation, handleIsOperationVisible }) => {
  const [isAddSpendVisible, setIsAddSpendVisible] = useState(true)
  const dispatch = useDispatch()

  const onEditSpend = (obj) => {
    dispatch(editOperation([obj, new Date(operation.date)]))
  }

  const handleIsAddSpendVisible = () => {
    setIsAddSpendVisible(prev => !prev)
    handleIsOperationVisible()
  }

  return (
    <>
      {isAddSpendVisible && <AddSpend
        category={operation.category}
        defaultDate={new Date(operation.date)}
        defaultDescr={operation.description || ''}
        defaultInvoice={operation.payWith}
        defaultSpendValue={operation.sum.toString()}
        onConfirm={onEditSpend}
        handleIsAddSpendVisible={handleIsAddSpendVisible}
        id={operation.id}
      />
      }
    </>
  )
}

export default OperationItem
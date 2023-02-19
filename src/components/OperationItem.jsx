import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewOperation, addSumToInvoice, decreaseSumInvoice, deleteOperation, editOperation } from '../redux/actions/moneyActions'
import AddSpend from './AddSpend'

const OperationItem = ({ operation, handleIsOperationVisible }) => {
  const [isAddSpendVisible, setIsAddSpendVisible] = useState(true)
  const dispatch = useDispatch()

  const onEditSpend = (editedOp) => {
    dispatch(editOperation([editedOp, operation]))
    if (editedOp.payWith !== operation.payWith) {
      dispatch(decreaseSumInvoice({ invoice: editedOp.payWith, sum: editedOp.sum }))
      dispatch(addSumToInvoice({ invoice: operation.payWith, sum: operation.sum }))
    } else {
      const difference = parseFloat(editedOp.sum) - parseFloat(operation.sum)
      if (difference > 0) {
        dispatch(decreaseSumInvoice({ invoice: editedOp.payWith, sum: difference.toString() }))
      } else if (difference < 0) {
        dispatch(addSumToInvoice({ invoice: editedOp.payWith, sum: difference.toString().slice(1) }))
      }
    }
  }

  const handleIsAddSpendVisible = () => {
    setIsAddSpendVisible(prev => !prev)
    handleIsOperationVisible()
  }

  const onDeleteOperation = () => {
    dispatch(deleteOperation(operation))
    handleIsOperationVisible()
  }

  const onDuplicateOperation = () => {
    dispatch(addNewOperation({ ...operation, id: Date.now() }))
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
        isEditOp={true}
        onDelete={onDeleteOperation}
        onDuplicate={onDuplicateOperation}
      />
      }
    </>
  )
}

export default OperationItem
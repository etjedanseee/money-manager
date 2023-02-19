import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import { getOperations } from '../utils/calcSpent'
import { getDayName } from '../utils/calcDate.js'
import OperationItem from '../components/OperationItem'

const Operations = () => {
  const { typeDateName, selectedDate } = useSelector(state => state.date)
  const { spent, categories, filterInvoiceBy } = useSelector(state => state.money)

  const [isOperationVisible, setIsOperationVisible] = useState(false)
  const [operation, setOperation] = useState(null)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [search, setSearch] = useState('')

  const [date, operations] = useMemo(() => getOperations(spent, selectedDate, filterInvoiceBy, search), [spent, selectedDate, filterInvoiceBy, search])

  const onEditOperations = (op, date) => {
    handleIsOperationVisible()
    setOperation({ ...op, date: new Date(date) })
  }

  const handleIsOperationVisible = () => {
    setIsOperationVisible(prev => !prev)
  }

  const handleIsSearchVisible = () => {
    setIsSearchVisible(prev => !prev)
    setSearch('')
  }

  const handleSearchOperations = (searchValue) => {
    setSearch(searchValue)
  }

  return (
    <div className='py-20 flex flex-col items-center text-black w-full'>
      <Header
        typeDateName={typeDateName}
        isEditCategories={false}
        isSearchButton={true}
        isSearchVisible={isSearchVisible}
        handleIsSearchVisible={handleIsSearchVisible}
        handleSearchOperations={handleSearchOperations}
      />
      {isOperationVisible && (
        <OperationItem operation={operation} handleIsOperationVisible={handleIsOperationVisible} />
      )}
      {date?.length > 0 ? date.map((d, i) => (
        operations[i].totalSum > 0
          ? (
            <div key={d} className='w-full'>
              <div className='flex items-center justify-between py-2 bg-gray-300'>
                <div className='text-blue-700 text-xl font-medium px-4'>{getDayName(new Date(d))}</div>
                <div className='px-4 text-red-500 font-medium'>-{operations[i].totalSum}$</div>
              </div>
              {operations[i].operations.map(op => (
                <div
                  key={op.id}
                  className='flex justify-between mb-2 gap-x-4 px-4 py-2'
                  onClick={() => onEditOperations(op, date[i])}
                >
                  <div className={`w-10 h-10 rounded-full`} style={{ backgroundColor: categories[op.category] }}></div>
                  <div className='flex-1'>
                    <div className='text-lg leading-none mb-1'>{op.category}</div>
                    <div className='text-gray-500 leading-none'>{op.payWith}</div>
                    {op?.description?.length > 0 ? (
                      <div className='text-gray-500 text-ellipsis truncate max-w-[180px] text-sm'>
                        {op.description}
                      </div>)
                      : null}
                  </div>
                  <div className='flex-initial text-red-500 font-medium'>-{op.sum}$</div>
                </div>
              ))}
            </div>
          )
          : null
      ))
        : <div className='pt-4 text-2xl text-gray-500'>No match operations</div>
      }
    </div>
  )
}

export default Operations
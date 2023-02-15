import React, { useState } from 'react'
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg'
import { ReactComponent as CheckMarkIcon } from '../assets/calculator/checkmark.svg'

const InvoiceOrCategoryItem = ({ arr, isNew, defaultTitle, defaultColor, onClose, onConfirm, type }) => {
  const [title, setTitle] = useState(defaultTitle)
  const [titleError, setTitleError] = useState('Title is required')
  const [isTitleDirty, setIsTitleDirty] = useState(false)
  const [color, setColor] = useState(defaultColor)

  const handleTitle = (e) => {
    setTitle(e.target.value)
    setIsTitleDirty(true)
    if (!e.target.value.trim().length) {
      setTitleError('Title is required')
    } else if (arr[e.target.value]) {
      setTitleError('Title must be unique')
    } else {
      setTitleError('')
    }
  }

  const handleColor = (e) => {
    setColor(e.target.value)
  }

  const handleOnConfirm = () => {
    setIsTitleDirty(true)
    onConfirm(title, titleError, color)
  }

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center pt-5 pb-2 text-white bg-[#e53872] px-6 gap-x-6'>
        <div className='flex-initial'>
          <ArrowIcon
            onClick={onClose}
            className='fill-white h-6 w-full'
          />
        </div>
        <div className='flex-1 text-2xl -mt-1'>{isNew ? `New ${type}` : `Edit ${type}`}</div>
        <div className='flex-initial'>
          <CheckMarkIcon
            onClick={handleOnConfirm}
            className='fill-white h-8 w-full'
          />
        </div>
      </div>
      <div className='flex justify-between items-center text-white bg-[#e53872] px-6 gap-x-6 pb-8'>
        <div className='flex-initial h-6 w-6'></div>
        <div className='flex-1 relative'>
          <div className='flex flex-col'>
            <div className='leading-none text-xs -mb-1'>Title</div>
            <input
              className='bg-transparent outline-none border-b-2 border-white py-1'
              spellCheck={false}
              type="text"
              value={title}
              onChange={handleTitle}
              onBlur={() => setIsTitleDirty(true)}
            />
            {isTitleDirty && <div className='absolute top-full left-0 underline font-medium'>{titleError}</div>}
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center text-white bg-[#e53872] px-6 gap-x-6 pb-8'>
        <div className='flex-initial h-6 w-6'></div>
        <div className='flex-1'>
          <div className='flex gap-x-4 items-center'>
            <div className='leading-none text-lg'>Color:</div>
            <input
              className='bg-transparent'
              type="color"
              value={color}
              onChange={handleColor}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceOrCategoryItem
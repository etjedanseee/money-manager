import React, { useState } from 'react'
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg'
import { ReactComponent as CheckMarkIcon } from '../assets/calculator/checkmark.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addNewCategory } from '../redux/actions/moneyActions'

const NewCattegory = ({ categories }) => {
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('Title is required')
  const [isTitleDirty, setIsTitleDirty] = useState(false)
  const [color, setColor] = useState('#4bb98f')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleTitle = (e) => {
    setTitle(e.target.value)
    if (!e.target.value.length) {
      setTitleError('Title is required')
    } else if (categories[e.target.value]) {
      setTitleError('Title must be unique')
    } else {
      setTitleError('')
    }
  }

  const handleColor = (e) => {
    setColor(e.target.value)
  }

  const onClose = () => {
    navigate('/')
  }

  const onAdd = () => {
    if (!titleError) {
      dispatch(addNewCategory({ title, color }))
      navigate('/')
    }
  }

  return (
    <div className='w-full '>
      <div className='flex justify-between items-center pt-5 pb-2 text-white bg-[#e53872] px-6 gap-x-6'>
        <div className='flex-initial'>
          <ArrowIcon
            onClick={onClose}
            className='fill-white h-6 w-full'
          />
        </div>
        <div className='flex-1 text-2xl -mt-1'>New category</div>
        <div className='flex-initial'>
          <CheckMarkIcon
            onClick={onAdd}
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

export default NewCattegory
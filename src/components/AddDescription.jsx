import React from 'react'

const AddDescription = ({ description, setDescription }) => {

  const onChange = (e) => {
    setDescription(e.target.value)
  }

  return (
    <input
      type="text"
      value={description}
      onChange={onChange}
      placeholder='add description'
      className='w-5/6 mb-4 outline-none px-3 text-center text-gray-500 caret-transparent'
      spellCheck={false}
    />
  )
}

export default AddDescription
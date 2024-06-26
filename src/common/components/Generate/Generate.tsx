import React from 'react'

const Generate = () => {
  return (
        <form
          className='flex flex-col items-center h-24 w-3/5 rounded bg-neutral-700 p-4'
          >
          <h1 className='text-center text-white text-bold text-xl p-4'>Generate English Images</h1>
          <input
            type="text"
            className='w-3/5 rounded p-4'
            placeholder='Entry, English word'
          />
        </form>
  )
}

export default Generate
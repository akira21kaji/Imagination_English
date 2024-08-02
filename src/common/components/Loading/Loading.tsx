import React from 'react'

const Loading = () => {
  return (
    <div className='flex justify-center' aria-label='loading'>
      <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neutral-900'></div>
    </div>
  )
}

export default Loading
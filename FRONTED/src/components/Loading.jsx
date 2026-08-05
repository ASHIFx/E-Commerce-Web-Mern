import React from 'react'

const Loading = () => {
  return (
    <div className='h-[70vh] flex justify-center items-center'>
        <div className='border-4 border-orange-500 w-12 h-12 rounded-full border-t-transparent animate-spin'></div>
    </div>
  )
}

export default Loading
import React from 'react'
import { CgClose } from 'react-icons/cg'

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center'>
      <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4 relative mt-10'> {/* Added mt-10 here */}
        <div 
          className='absolute top-0  right-2 text-2xl hover:text-red-600 cursor-pointer' 
          onClick={onClose}
        >
          <CgClose />
        </div>

        <div className='flex justify-center p-3 left-0 max-w-[75vh] max-h-[75vh]'>
          <img src={imgUrl} className='w-full h-full object-contain' />
        </div>
      </div>
    </div>
  )
}

export default DisplayImage

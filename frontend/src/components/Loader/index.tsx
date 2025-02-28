import React from 'react'

const Loader = () => {
  return (
    <div className='absolute top-0 left-0 w-full h-[100vh] z-[20] bg-[#000000f8] flex flex-col justify-center items-center'>
        <span className='mb-[30px] text-[39px]'>Loading</span>
        <span className="loader"></span>
    </div>
  )
}

export default Loader
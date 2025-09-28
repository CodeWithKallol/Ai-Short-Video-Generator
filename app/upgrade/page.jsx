import React from 'react'
import PriceCards from './_components/PriceCards'

function page() {
  return (
    <div className='md:px-20'>
        <h2 className='font-bold text-4xl text-indigo-700 text-center'>Upgrade your plan</h2>
        <p className='text-2xl text-gray-500 text-center mt-3'>Upgrade your free plan and create unlimited ai-short-video for only $1.</p>

        <div className='mt-10 shadow-md p-10'>
          <PriceCards/>
        </div>
    </div>
  )
}

export default page
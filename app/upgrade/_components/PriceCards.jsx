"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

function PriceCards() {
    const priceList = [
        {
            price: 0,
            description: 'Free plan for limited ai short video generation.',
            priceSelect: 'Free plan',
            features: [
                '✅ Free access of video generation upto 5 videos.',
                '✅ Slow and low quality video generation.'
            ]
        },
        {
            price: 1,
            description: 'Generate unlimited ai short video.',
            priceSelect: 'For $1',
            features: [
                '✅ Unlimited access of video generation.',
                '✅ Fast and high quality video generation.'
            ]
        }
    ]
    const [selectedPlan, setSelectedPlan] = useState();
  return (
    <div className='mt-1'>
        <h2 className='font-bold text-2xl text-indigo-700'>Plans</h2>
        <p className='text-gray-400'>Select your plan</p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 mt-3'>
            {priceList.map((item, index)=>(
                <div key={item.description} className='bg-gray-600 p-10 text-white text-center rounded-xl hover:bg-teal-600 hover:scale-105 transition-all'>
                    <h2 className='text-3xl'>Price: ${item.price}</h2>
                    <h2 className='text-xl mt-2'>{item.description}</h2>
                    <Button className='bg-indigo-700 mt-5 p-5 font-bold text-xl cursor-pointer hover:bg-green-700 '
                        onClick={()=>{
                            setSelectedPlan(item.price)
                        }}
                    >
                        {item.priceSelect}
                    </Button>
                    <hr className='mt-4'/>
                    {item.features.map((item, index)=>(
                        <h2 className='text-xl mt-3' key={item}>{item}</h2>
                    ))}
                </div>
            ))}
        </div>
    </div>
  )
}

export default PriceCards
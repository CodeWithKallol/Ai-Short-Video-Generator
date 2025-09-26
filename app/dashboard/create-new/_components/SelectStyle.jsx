"use client"
import Image from 'next/image'
import React, { useState } from 'react'

function SelectStyle({onUserSelect}) {
    const styleOptions = [
        {
            name: 'Realistic',
            image: '/real.jpg'
        },
        {
            name: 'Cartoon',
            image: '/cartoon.jpg'
        },
        {
            name: 'Comic',
            image: '/comic.jpeg'
        },
        {
            name: 'WaterColor',
            image: '/watercolor.jpg'
        },
        {
            name: 'GTA',
            image: '/gta.jpg'
        },
    ]
    const [selectedOption, setSelectedOption] = useState();
  return (
    <div className='mt-7'>
        <h2 className='font-bold text-2xl text-indigo-700'>Style</h2>
        <p className='text-gray-400'>Select your video style</p>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5
        xl:grid-cols-6 gap-5 mt-3'>
            {styleOptions.map((item, index)=>(
                <div key={item.name} className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl
                 ${selectedOption==item.name&&`border-4 border-indigo-700`}`}> 
                    <Image src={item.image} width={100} height={100} alt={item.name}
                        onClick={()=>{
                            setSelectedOption(item.name)
                            onUserSelect('imageStyle', item.name)
                        }}

                    className='h-48 object-cover rounded-lg w-full'/>
                    <h2 className={`absolute p-1 bg-black text-white bottom-0 w-full text-center rounded-b-lg
                     hover:bg-indigo-700 ${selectedOption==item.name&&`bg-indigo-700 text-white`}`}>{item.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SelectStyle
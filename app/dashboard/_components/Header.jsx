import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='p-3 px-5 flex items-center justify-between shadow-md'>
        <div className='flex gap-3 items-center cursor-pointer'>
            <Image src={'/logo.png'} alt='Ai Short Video' width={30} height={30}/>
            <h2 className='font-bold text-xl'><span className='text-red-600'>AI</span>Short</h2>
        </div>
        <div className='flex gap-3 items-center'>
            <Button className='text-xl bg-indigo-700 cursor-pointer'>Dashboard</Button>
            <UserButton/>
        </div>
    </div>
  )
}

export default Header
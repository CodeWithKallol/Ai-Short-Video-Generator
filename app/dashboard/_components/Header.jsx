
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'


function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <div className='p-3 px-5 flex items-center justify-between shadow-md'>
      <Link href={'/'}>
        <div className='flex gap-3 items-center cursor-pointer hover:scale-105'>
          <Image src={'/logo.png'} alt='Ai Short Video' width={30} height={30} />
          <h2 className='font-bold text-xl'><span className='text-red-600'>AI</span>Short</h2>
        </div>
      </Link>
      <div className='flex gap-3 items-center'>
        <div className='flex gap-1 items-center'>
          <Image src={'/coin.png'} width={20} height={20} alt='credits' />
          <h2>{userDetail?.credits}</h2>
        </div>
        <Link href={'/dashboard'}>
          <Button className='text-xl bg-indigo-700 cursor-pointer'>Dashboard</Button>
        </Link>
        <UserButton />
      </div>
    </div>
  )
}

export default Header
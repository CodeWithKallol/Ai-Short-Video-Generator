"use client"
import { Button } from "@/components/ui/button"
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from 'next/image'

export default function Home() {
  const { user } = useUser()
  return (
    <div>
      <div className="flex gap-10 justify-between items-center p-3 px-5 shadow-md hover:shadow-2xl">
        <div className='flex gap-3 items-center cursor-pointer'>
          <Image src={'/logo.png'} alt='Ai Short Video' width={30} height={30} />
          <h2 className='font-bold text-xl'><span className='text-red-600'>AI</span>Short</h2>
        </div>

        <div className="flex gap-2.5 hover:scale-105 transition-all">
          <Link href={'/dashboard'}>
            <Button className="bg-indigo-700 text-xl cursor-pointer hover:bg-green-700 py-4">Dashboard</Button>
          </Link>

          {user ? <UserButton /> :
            <Link href={'/sign-in'}>
              <Button className="bg-indigo-700 text-xl cursor-pointer hover:bg-green-700">Sign-in</Button>
            </Link>
          }
        </div>
      </div>

      <main className="mx-auto w-full py-12 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="text-center">
          <div className="items-center text-center text-5xl">
            {user && <h2>Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-500">{user?.fullName}</span></h2>}
          </div>
          <div className="text-white text-3xl grid gap-5 ">
            <div>
              <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">Generate Stunning</span><br />
                  <span className='block mt-2'>Videos Instantly.</span>
                </h1>
              </div>
              <p className="text-2xl text-gray-400 mx-auto">
                Leverage the power of AI to create engaging short-form video content in seconds, not hours. Perfect for social media and quick campaigns.
              </p>
            </div>
            <div>
              <Button className="bg-indigo-700 text-white text-xl cursor-pointer p-5 hover:bg-purple-700">Let's Get started</Button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

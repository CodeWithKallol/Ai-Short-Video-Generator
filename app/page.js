"use client"
import { Button } from "@/components/ui/button"
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from 'next/image'
import React, { useState, useEffect } from 'react';

const SLIDE_IMAGES = [
  "https://placehold.co/800x600/1e40af/ffffff?text=AI+Vision",
  "https://placehold.co/800x600/06b6d4/ffffff?text=Instant+Creation",
  "https://placehold.co/800x600/4f46e5/ffffff?text=Cinematic+Quality",
  "https://placehold.co/800x600/10b981/ffffff?text=Fast+Delivery",
];

export default function Home() {
  const { user } = useUser();

  const ImageSlideshow = ({ images }) => {
  const [current, setCurrent] = useState(0);

  // Auto-advance logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [images.length]);
  
  // Custom transition class to control opacity via style
  const transitionClass = "transition-opacity duration-1000 ease-in-out";

  return (
    <div 
      className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-gray-800"
      style={{
        boxShadow: '0 0 50px rgba(79, 70, 229, 0.5), 0 0 100px rgba(109, 40, 217, 0.3)',
        transform: 'rotateY(5deg) rotateX(2deg) scale(1.02)', // Softened 3D tilt
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {images.map((src, index) => (
        <img 
          key={index}
          src={src} 
          alt={`AI Feature Slide ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover rounded-3xl ${transitionClass}`}
          style={{
            opacity: index === current ? 1 : 0,
            zIndex: index === current ? 10 : 1,
            // Simple overlay for a cooler aesthetic
            filter: 'brightness(0.85)', 
          }}
          // Fallback in case of broken image URL
          onError={(e) => { e.target.src = "https://placehold.co/800x600/000000/ffffff?text=Image+Load+Error"; }}
        />
      ))}
      
      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? 'bg-cyan-400 w-8' : 'bg-gray-400 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
  return (
    <div>
      <div className="flex gap-10 justify-between items-center p-3 px-5 hover:shadow-2xl">
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
      <div className="bg-gray-900">
      <main className="mx-auto w-full py-12 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="text-center">
          <div className="items-center text-center text-5xl">
            {user && <h2>Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-500">{user?.fullName}</span></h2>}
          </div>
          <div className="text-white text-3xl grid gap-5 ">
            <div>
              <div className="text-center mt-5">
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">Generate Stunning</span><br />
                  <span className='block mt-2'>Videos Instantly.</span>
                </h1>
              </div>
              <p className="text-2xl text-gray-400 mx-auto mt-5">
                Leverage the power of AI to create engaging short-form video content in seconds, not hours. Perfect for social media and quick campaigns.
              </p>
            </div>
            <div>
              <Link href={'/dashboard/create-new'}>
                <Button className="bg-indigo-700 text-white text-xl cursor-pointer p-5 hover:bg-purple-700 mt-3">Let's Get started</Button>
              </Link>
            </div>

          </div>
          
        </div>
        {/* Right Visual Block (Slideshow) */}
            <div className="relative w-full h-80 md:h-96 lg:h-[500px] flex justify-center items-center mt-15">
              <ImageSlideshow images={SLIDE_IMAGES} />
            </div>
      </main>
      <footer className="py-6 mt-12 border-t border-gray-700/50 text-center text-gray-500 bg-gray-900">
            <p>&copy; 2025 AIShort. All rights reserved. | Built with 🤖 AI Power</p>
        </footer>
        </div>
    </div>
  );
}

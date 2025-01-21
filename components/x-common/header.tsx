'use client'
import React from 'react'
import ModeTogle from './theme-toggle'
import { useRouter } from 'next/navigation'

const Header = () => {
  const route = useRouter();
  const handleHome = () => {
    route.push('/')
  }
  return (
    <div className='flex px-2 border-2 border-#e5e7eb h-14 items-center justify-between'>
      <div className="font-bold lg:inline-block cursor-pointer" onClick={handleHome}>노종열 사전 과제</div>
      <div>
        <>검색창</>
        <ModeTogle />
      </div>
    </div>
  )
}

export default Header
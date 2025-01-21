import React from 'react'
import ModeTogle from './mode-toggle'

const Header = () => {
  return (
    <div className='flex px-2 border-2 border-#e5e7eb h-14 items-center justify-between'>
      <div className="font-bold lg:inline-block">노종열 사전 과제</div>
      <div>
        <>검색창</>
        <ModeTogle />
      </div>
    </div>
  )
}

export default Header
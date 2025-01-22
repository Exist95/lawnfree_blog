'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Github, Mail } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

const Header = () => {
  const route = useRouter();
  const handleHome = () => {
    route.push('/')
  }

  return (
    <header className='flex px-2 border-2 border-#e5e7eb h-14 items-center justify-between'>
      <div className="font-bold lg:inline-block cursor-pointer" onClick={handleHome}>노종열 사전 과제</div>
      <div className='flex gap-2'>
        <Button variant='outline' size="icon">
          <Link href={'https://github.com/Exist95/lawnfree_blog'}>
            <Github />
          </Link>
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon"><Mail /></Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>jyeol0210@naver.com</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  )
}

export default Header
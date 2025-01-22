'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const AddPostButton = () => {
  const route = useRouter();

  const handleAddPost = () => {
    route.push('/posts/add')
  }

  return (
    <Button onClick={handleAddPost} className='mt-4'>Add a new post</Button>
  )
}

export default AddPostButton
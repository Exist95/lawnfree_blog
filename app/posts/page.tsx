import AddPostButton from '@/components/posts/button/add-post'
import PostTable from '@/components/posts/table'
import React from 'react'

const Posts = () => {
  return (
    <div className='flex flex-col items-center w-full'>
      <PostTable />
      <AddPostButton />
    </div>
  )
}

export default Posts
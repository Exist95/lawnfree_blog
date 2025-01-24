import AddPostButton from '@/components/posts/button/add-button'
import PostTable from '@/components/posts/table/table'
import React from 'react'

const Posts = () => {
  return (
    <div className='flex flex-col gap-4'>
      <AddPostButton />
      <PostTable />
    </div>
  )
}

export default Posts
import Pagenation from '@/components/common/pagination'
import SearchBar from '@/components/common/search-bar'
import AddPostButton from '@/components/posts/button/add-button'
import PostTable from '@/components/posts/table'
import React from 'react'

const Posts = () => {
  return (
    <div className='flex flex-col gap-4'>
      <AddPostButton />
      <PostTable />
      <Pagenation />
      <SearchBar />
    </div>
  )
}

export default Posts
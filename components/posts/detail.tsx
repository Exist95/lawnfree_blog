import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { IPost } from '@/types/post'
import { formatDate } from '@/lib/format'
import DetailPostButton from './button/detail-button'
import LikesButton from './button/likes-button'

const PostDetail = ({ post }: { post: IPost }) => {

  return (
    <Card >
      <CardHeader>
        <div className='flex justify-between items-center'>
          <CardTitle>{post.title}</CardTitle>
          <DetailPostButton postId={post.id} postCategory={post.categories} />
        </div>
        <div className='flex items-center gap-2'>
          <CardDescription>{post.author}</CardDescription>
          <CardDescription>|</CardDescription>
          <CardDescription>{post.date ? formatDate(post.date) : null}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className='min-h-[400px]'>{post.content}</div>
        <LikesButton post={post} />
      </CardContent>
    </Card>
  )
}

export default PostDetail
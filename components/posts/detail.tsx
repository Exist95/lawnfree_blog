import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { IPost } from '@/types/post'
import { formatDate } from '@/lib/format'
import DetailPostButton from './button/detail-button'
import LikesButton from './button/likes-button'
import { Badge } from '../ui/badge'

const PostDetail = ({ post }: { post: IPost }) => {

  return (
    <Card >
      <CardHeader>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2'>
            <CardTitle>{`[ ${post.categories} ]`}</CardTitle>
            <CardTitle>: {post.title}</CardTitle>
          </div>
          <DetailPostButton postId={post.id} />
        </div>
        <div className='flex flex-col gap-2'>
          <CardDescription>writer: {post.writer}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className='min-h-[300px]'>{post.contents}</div>
        {post?.tags && <Badge>{'#' + post.tags}</Badge>}
        <LikesButton post={post} />
      </CardContent>
      <CardFooter className='flex justify-end text-sm'>
        {post.date
          ? <div className='flex gap-2 items-center'>
            <div>Written on :</div>
            <div>{formatDate(post.date)}</div>
          </div>
          : null}
      </CardFooter>
    </Card>
  )
}

export default PostDetail
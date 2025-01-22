import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Post } from '@/types/post'
import { ThumbsUp } from 'lucide-react'
import { formatDate } from '@/lib/format'
import { usePostAction } from '@/hooks/usePostAction'
import { Button } from '../ui/button'
import DetailPostButton from './button/detail-button'

const PostCard = ({ post }: { post: Post }) => {
  const { updatePostLikes } = usePostAction();

  return (
    <Card >
      <CardHeader>
        <div className='flex justify-between items-center'>
          <CardTitle>{post.title}</CardTitle>
          <DetailPostButton postId={post.id} />
        </div>
        <div className='flex items-center gap-2'>
          <CardDescription>{post.author}</CardDescription>
          <CardDescription>|</CardDescription>
          <CardDescription>{post.date ? formatDate(post.date) : null}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className='min-h-[400px]'>{post.content}</div>
        <div className='flex justify-center items-center '>
          {!!post.likes
            ? <Button variant="secondary" onClick={() => updatePostLikes(post.id)}><ThumbsUp />Like</Button>
            : <Button onClick={() => updatePostLikes(post.id)}><ThumbsUp />Like</Button>
          }
        </div>
      </CardContent>
    </Card>
  )
}

export default PostCard
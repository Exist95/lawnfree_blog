import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Post } from '@/types/post'
import { ThumbsUp, Pencil, Trash2, EllipsisVertical } from 'lucide-react'
import { formatDate } from '@/lib/format'
import { usePostAction } from '@/hooks/usePostAction'
import { Button } from '../ui/button'

const PostCard = ({ post }: { post: Post }) => {
  const { updatePostLikes } = usePostAction();

  return (
    <Card className='w-full'>
      <CardHeader>
        <div className='flex justify-between items-center'>
          <CardTitle>{post.title}</CardTitle>
          <EllipsisVertical />
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
            ? <Button onClick={() => updatePostLikes(post.id)}><ThumbsUp />Like</Button>
            : <Button className='bg-blue-800' onClick={() => updatePostLikes(post.id)}><ThumbsUp />Like</Button>
          }
        </div>
        <Pencil />
        <Trash2 />

      </CardContent>
    </Card>
  )
}

export default PostCard
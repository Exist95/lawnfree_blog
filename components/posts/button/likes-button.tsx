import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { usePostAction } from '@/hooks/usePostAction';
import { IPost } from '@/types/post'
import { ThumbsUp } from 'lucide-react';
import React from 'react'

const LikesButton = ({ post }: { post: IPost }) => {
  const { updatePostLikes } = usePostAction();
  return (

    <div className='flex justify-center items-center '>
      {!!post.likes
        ?
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => updatePostLikes(post.id)}><ThumbsUp />Like</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>If you like this post, please press the button</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        :
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" onClick={() => updatePostLikes(post.id)}><ThumbsUp />Like</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>If you like this post, please press the button</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
    </div>
  )
}

export default LikesButton
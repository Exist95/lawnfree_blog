'use client'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from '@/hooks/use-toast'
import { usePostAction } from '@/hooks/usePostAction'
import { EllipsisVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const DetailPostButton = ({ postId, }: { postId: number }) => {
  const route = useRouter();
  const { removePost } = usePostAction();

  const handleEdit = () => {
    route.push(`/posts/edit//${postId}`);
  }

  const handleDelete = async () => {
    try {
      await removePost(postId);
      toast({
        description: "Your post has been deleted.",
      });

    } catch (error) {
      toast({
        description: "Failed to delete the post.",
      });
    }

    route.push('/');
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEdit}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default DetailPostButton
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const DetailPostButton = ({ postId }: { postId: number }) => {
  const route = useRouter();

  const handleEdit = () => {
    route.push(`/posts/edit/${postId}`);
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        {/* 직관을 위한 아이콘 미사용 */}
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEdit}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => { }}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default DetailPostButton
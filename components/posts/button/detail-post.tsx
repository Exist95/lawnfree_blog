import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react'
import React from 'react'

const DetailPostButton = () => {
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
          <DropdownMenuItem onClick={() => { }}>
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
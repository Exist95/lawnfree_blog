'use client'

import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { usePostAction } from '@/hooks/usePostAction'

const PostTable = () => {
  const { posts } = usePostAction();

  return (
    <div>
      {posts.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">번호</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="text-right w-[100px]">글쓴이</TableHead>
              <TableHead className="text-right w-[100px]">추천</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell className="text-right w-[100px]">Credit Card</TableCell>
              <TableCell className="text-right w-[100px]">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) :
        <Table>
          <p className="text-center text-gray-500 text-2xl font-bold">There is no post..</p>
        </Table>
      }
    </div>


  )
}

export default PostTable
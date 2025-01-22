'use client'

import React, { useLayoutEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { usePostAction } from '@/hooks/usePostAction'
import { useRouter } from 'next/navigation'
import { formatDate } from '@/lib/format'

const PostTable = () => {
  const { posts, loadPosts } = usePostAction();
  const route = useRouter();

  useLayoutEffect(() => {
    loadPosts(); // 컴포넌트가 마운트될 때 게시글 로드
  }, [loadPosts]);

  // 해당 게시글의 상세 페이지로 이동
  const handleRowClick = (id: number) => {
    route.push(`/posts/${id}`);
  };

  return (
    <div>
      {posts.length > 0 ? (
        <>
          <div className='w-full text-left text-2xl font-bold text-gray-500'>List of posts</div>
          <div className='overflow-x-auto'>
            <Table className='min-w-full'>
              <TableHeader>
                <TableRow>
                  <TableHead className=''>TITLE</TableHead>
                  <TableHead className="w-1/6 text-right">AUTHOR</TableHead>
                  <TableHead className="w-2/6 text-right">DATE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  //링크 사용시, 스타일 깨지는 문제 발생. onClick으로 대체
                  <TableRow key={post.id} onClick={() => handleRowClick(post.id)} style={{ cursor: 'pointer' }}>
                    <TableCell className='overflow-hidden whitespace-nowrap text-ellipsis'>{post.title}</TableCell>
                    <TableCell className="w-2/6 text-right overflow-hidden whitespace-nowrap text-ellipsis">{post.author}</TableCell>
                    <TableCell className="text-right ">{post.date ? formatDate(post.date) : null}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) :
        <p className="text-center text-gray-500 text-2xl font-bold">There is no post..</p>
      }
    </div>


  )
}

export default PostTable
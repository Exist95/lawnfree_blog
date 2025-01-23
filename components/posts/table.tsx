'use client'

import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { usePostAction } from '@/hooks/usePostAction'
import { useRouter } from 'next/navigation'
import { formatDate } from '@/lib/format'
import Paginations from '../common/pagination'
import SearchBar from '../common/search-bar'

const PostTable = () => {
  const { posts, loadPosts } = usePostAction();
  const route = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const postsPerPage = 10; // 한 페이지에 표시할 게시물 수

  useEffect(() => {
    loadPosts(); // 컴포넌트가 마운트될 때 게시글 로드
  }, [loadPosts]);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // 현재 페이지에 해당하는 게시물 가져오기
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);


  useEffect(() => {
    const results = search
      // 게시판 속성에 따라 ===(일치)가 아니라 includes로 로직 작성
      ? posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
      : posts; // 검색어가 없으면 모든 게시물 반환
    setFilteredPosts(results); // 필터링된 게시물 상태 업데이트
    setCurrentPage(1); // 검색할 때마다 첫 페이지로 리셋
  }, [search, posts]); // searchTerm이나 posts가 변경될 때마다 실행

  // 해당 게시글의 상세 페이지로 이동
  const handleRowClick = (id: number) => {
    route.push(`/posts/${id}`);
  };

  return (
    <div className='flex flex-col gap-6'>

      <div className='flex w-full justify-end'>
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      {filteredPosts.length > 0 ? (
        <>
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
                {currentPosts.map((post) => (
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

          <Paginations
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage} // 페이지 변경 핸들러
          />
        </>
      ) :
        <p className="text-center text-gray-500 text-2xl font-bold">There is no post..</p>
      }
    </div>


  )
}

export default PostTable
'use client'

import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { usePostAction } from '@/hooks/usePostAction'
import { formatDate } from '@/lib/format'
import Paginations from '../../common/pagination'
import SearchBar from '../../common/search-bar'
import { Trash } from 'lucide-react'
import { Button } from '../../ui/button'
import { categories } from '@/lib/categories'
import PostSelect from './select'

const PostTable = () => {
  const { posts, loadPosts, handleDelete, handleDetailPage } = usePostAction();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const postsPerPage = 10; // 한 페이지에 표시할 게시물 수
  const [selectedCategory, setSelectedCategory] = useState('Category Filter');
  const [selectedTag, setSelectedTag] = useState('Tag Filter')

  useEffect(() => {
    loadPosts(); // 컴포넌트가 마운트될 때 게시글 로드
  }, [loadPosts]);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // 현재 페이지에 해당하는 게시물 가져오기
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const uniqueTags = Array.from(
    new Set(posts.flatMap(post => post.tags).filter((tag): tag is string => tag !== undefined && tag !== ''))
  );

  useEffect(() => {
    //불러온 posts에 filter 메서드 사용
    const results = posts.filter(post => {

      const matchesSearch = search
        ? post.title.toLowerCase().includes(search.toLowerCase())
        : true;

      const matchesCategory = selectedCategory === 'Category Filter' || post.categories === selectedCategory;

      const matchesTag = selectedTag === 'Tag Filter' || post.tags === selectedTag

      return matchesSearch && matchesCategory && matchesTag;
    })


    setFilteredPosts(results); // 필터링된 게시물 상태 업데이트
    setCurrentPage(1); // 검색할 때마다 첫 페이지로 리셋
  }, [search, posts, selectedCategory, selectedTag]); // searchTerm이나 posts가 변경될 때마다 실행

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex w-full justify-between gap-2'>
        <div className='flex w-full justify-between gap-2'>
          <PostSelect
            placeholder="Select Category"
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            options={["Category Filter", ...categories]}
          />
          <PostSelect
            placeholder="Select Tag"
            value={selectedTag}
            onValueChange={setSelectedTag}
            options={["Tag Filter", ...uniqueTags]}
          />
          <SearchBar search={search} setSearch={setSearch} />
        </div>

      </div>

      {filteredPosts.length > 0 ? (
        <>
          <div className='overflow-x-auto'>
            <Table className='min-w-full'>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-3/6'>TITLE</TableHead>
                  <TableHead className="w-1/6 ">WRITER</TableHead>
                  <TableHead className="w-1/6 ">DATE</TableHead>
                  <TableHead className="w-1/6 text-right">DELETE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPosts.map((post) => (
                  //링크 사용시, 스타일 깨지는 문제 발생. onClick으로 대체
                  <TableRow key={post.id} onClick={() => handleDetailPage(post.id)} style={{ cursor: 'pointer' }}>
                    <TableCell>{post.title}</TableCell>
                    <TableCell>{post.writer}</TableCell>
                    <TableCell>{post.date ? formatDate(post.date, true) : null}</TableCell>
                    <TableCell className='text-right'>
                      <Button variant='secondary' size='sm' onClick={() => handleDelete(post.id)}>
                        <Trash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Paginations
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) :
        <p className="text-center text-gray-500 text-2xl font-bold">There is no post..</p>
      }
    </div>


  )
}

export default PostTable
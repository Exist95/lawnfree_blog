'use client';

import PostCard from '@/components/posts/card';
import { usePostAction } from '@/hooks/usePostAction';
import { Post } from '@/types/post';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const DetailClient = () => {
  const { id } = useParams<{ id: string }>(); // 파라미터에서 가져온느 것임으로 string 타입
  const { posts, setPosts } = usePostAction(); // 게시글 데이터 가져오기
  const [post, setPost] = useState<Post | null>(null); // 선택한 게시글 상태

  useEffect(() => {
    // 세부페이지에서 새로고침 했을 때, 게시글 목록 리스트를 불러오지 못해서 SetPosts를 사용하여 게시글 목록을 설정
    // 로컬스토리지에서 초기 데이터를 가져오기
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    if (storedPosts.length > 0 && posts.length === 0) {
      setPosts(storedPosts);
    }
  }, [posts, setPosts]);

  useEffect(() => {
    if (id) {
      const postId = Number(id); // ID를 number로 변환
      const foundPost = posts.find((p) => p.id === postId); // 해당 ID의 게시글 찾기
      setPost(foundPost || null); // 상태에 게시글 저장 (없으면 null)
    }
  }, [id, posts]);

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>; // 게시글이 없을 경우 메시지 표시
  }

  return (
    <>
      <PostCard post={post} /> {/* PostCard 컴포넌트 사용 */}
    </>
  )
}

export default DetailClient
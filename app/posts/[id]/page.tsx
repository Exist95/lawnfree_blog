'use client'
import PostDetail from '@/components/posts/detail';
import { usePostAction } from '@/hooks/usePostAction';
import { IPost } from '@/types/post';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const DetailPosts = () => {
  const { id } = useParams<{ id: string }>();
  const { posts, setPosts } = usePostAction();
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    // 세부페이지에서 새로고침 했을 때, 게시글 목록 리스트를 불러오지 못해서 SetPosts를 사용하여 게시글 목록을 설정
    // 로컬스토리지에서 초기 데이터를 가져오기
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    if (storedPosts.length > 0 && posts.length === 0) {
      setPosts(storedPosts);
    }
  }, [posts, setPosts]);

  // useEffect(() => {
  //   if (id) {
  //     const postId = Number(id);
  //     const foundPost = posts.find((p) => p.id === postId);
  //     setPost(foundPost || null);
  //   }
  // }, [id, posts]);

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <PostDetail post={post} />
  )
}

export default DetailPosts
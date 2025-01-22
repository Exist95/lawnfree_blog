'use client'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import usePostForm, { PostFormValues } from '@/hooks/usePostForm';
import { usePostStore } from '@/store/usePostStore';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const EditPostForm = () => {
  const { id } = useParams(); // URL에서 ID 가져오기
  const [post, setPost] = useState<PostFormValues | null>(null); // 게시글 상태
  const form = usePostForm();
  const { updatePost } = usePostStore();

  useEffect(() => {
    // 로컬스토리지에서 게시글 찾기
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      const posts = JSON.parse(storedPosts);
      const foundPost = posts.find((p: any) => p.id === Number(id)); // ID로 게시글 찾기
      setPost(foundPost); // 상태에 저장
    }
  }, [id]);


  useEffect(() => {
    if (post) {
      form.setValue('title', post.title);
      form.setValue('content', post.content);
      form.setValue('author', post.author);
    }
  }, [post, form])

  const handleSubmit = (data: PostFormValues) => {
    // 게시글 수정 로직
    const updatedPost = {
      id: Number(id), // 기존 ID 유지
      title: data.title,
      content: data.content,
      author: data.author,
      date: post?.date || new Date(new Date().getTime() + (9 * 60 * 60 * 1000)).toISOString(),
      likes: post?.likes || false,
    };

    updatePost(Number(id), updatedPost);
  }

  return (
    <div className=''>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col justify-center items-center w-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>제목</FormLabel>
                <FormControl>
                  <Input placeholder="제목을 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>글쓴이</FormLabel>
                <FormControl>
                  <Input placeholder="글쓴이를 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>내용</FormLabel>
                <FormControl>
                  <Textarea placeholder="내용을 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-between items-center w-full gap-2'>
            <Button variant='secondary' className="w-full mt-4">
              Cancle
            </Button>
            <Button type="submit" className="w-full mt-4">
              Edit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EditPostForm
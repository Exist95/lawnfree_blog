'use client'
import React, { useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Textarea } from '../../ui/textarea'
import usePostForm, { PostFormValues } from '@/hooks/usePostForm'
import { usePostStore } from '@/store/usePostStore'
import { useRouter } from 'next/navigation'

const AddPostForm = () => {
  const form = usePostForm();
  const { addPost, loadPosts } = usePostStore();
  const route = useRouter();

  useEffect(() => {
    loadPosts(); // 컴포넌트가 마운트될 때 게시글을 로드
  }, [loadPosts]);

  const handleSubmit = (data: PostFormValues) => {
    const newPost = {
      id: Date.now(), // 유니크한 ID 생성
      title: data.title,
      content: data.content,
      author: data.author,
      date: new Date(new Date().getTime() + (9 * 60 * 60 * 1000)).toISOString(), // 한국 시간으로 설정
      likes: false,
    };

    addPost(newPost); // 게시글 추가
    form.reset(); // 폼 초기화
    route.push('/')
  };

  return (
    <div className='flex justify-center items-center mt-5'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col justify-center items-center w-full"
        >
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

          <Button type="submit" className="w-full mt-4">
            게시글 추가
          </Button>
        </form>

      </Form>
    </div>
  )
}

export default AddPostForm
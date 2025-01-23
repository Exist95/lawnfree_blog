'use client'
import React, { useEffect, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import usePostForm, { PostFormValues } from '@/hooks/usePostForm';
import { usePostStore } from '@/store/usePostStore';
import { useRouter, useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import FormInput from './input';

const PostForm = () => {
  const { id } = useParams(); // URL에서 ID 가져오기
  const [post, setPost] = useState<PostFormValues | null>(null); // 게시글 상태
  const form = usePostForm();
  const { addPost, updatePost, loadPosts } = usePostStore();
  const route = useRouter();
  const { toast } = useToast();

  const isEditing = Boolean(id); // ID가 있으면 수정 모드

  useEffect(() => {
    if (isEditing) {
      // 로컬스토리지에서 게시글 찾기
      const storedPosts = localStorage.getItem('posts');
      if (storedPosts) {
        const posts = JSON.parse(storedPosts);
        const foundPost = posts.find((p: any) => p.id === Number(id)); // ID로 게시글 찾기
        setPost(foundPost); // 상태에 저장
      }
    }
  }, [id, isEditing]);

  useEffect(() => {
    if (post) {
      form.setValue('title', post.title);
      form.setValue('contents', post.contents);
      form.setValue('author', post.author);
      form.setValue('categories', post.categories);
    }
  }, [post, form]);

  useEffect(() => {
    loadPosts(); // 컴포넌트가 마운트될 때 게시글을 로드
  }, [loadPosts]);

  const handleSubmit = (data: PostFormValues) => {
    if (isEditing) {
      // 게시글 수정 로직
      const updatedPost = {
        id: Number(id), // 기존 ID 유지
        title: data.title,
        contents: data.contents,
        author: data.author,
        date: post?.date || new Date(new Date().getTime() + (9 * 60 * 60 * 1000)).toISOString(),
        likes: post?.likes || false,
        categories: data.categories,
      };

      updatePost(Number(id), updatedPost);
      toast({
        description: "Your post has been updated.",
      });

    } else {
      // 게시글 추가 로직
      const newPost = {
        id: Date.now(), // 유니크한 ID 생성
        title: data.title,
        contents: data.contents,
        author: data.author,
        date: new Date(new Date().getTime() + (9 * 60 * 60 * 1000)).toISOString(), // 한국 시간으로 설정
        likes: false,
        categories: data.categories,
      };

      addPost(newPost); // 게시글 추가
      toast({
        description: "Your post has been registered on the bulletin board.",
      });
    }

    form.reset(); // 폼 초기화
    route.push('/'); // 홈으로 리디렉션
  };

  return (
    <div className='flex justify-center items-center mt-5'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col justify-center items-center w-full gap-4">

          <FormInput
            control={form.control}
            label="categories"
            options={['Free', 'Question', 'Humor']} // 드롭다운 옵션
          />
          <FormInput control={form.control} label={'title'} />
          <FormInput control={form.control} label={'author'} />
          <FormInput control={form.control} label={'contents'} />

          <div className='flex justify-between items-center w-full gap-2'>
            <Button type="submit" className="w-full mt-4">
              {isEditing ? 'Edit' : 'Add a post'}
            </Button>
          </div>

        </form>
      </Form>
    </div>
  );
};

export default PostForm;

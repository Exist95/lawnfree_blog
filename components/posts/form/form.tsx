'use client'
import React, { useEffect, useState } from 'react';
import { Form } from '../../ui/form';
import { Button } from '../../ui/button';
import usePostForm, { PostFormValues } from '@/hooks/usePostForm';
import { usePostStore } from '@/store/usePostStore';
import { useParams } from 'next/navigation';
import FormInput from './input';
import { categories } from '@/lib/categories';
import { usePostAction } from '@/hooks/usePostAction';

const PostForm = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostFormValues | null>(null);
  const { form, handleSubmit } = usePostForm();
  const { loadPosts } = usePostStore();
  const { handleHome } = usePostAction();

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
      form.setValue('writer', post.writer);
      form.setValue('categories', post.categories);
      form.setValue('tags', post.tags);
    }
  }, [post, form]);

  useEffect(() => {
    loadPosts(); // 컴포넌트가 마운트될 때 게시글을 로드
  }, [loadPosts]);

  return (
    <div className='flex justify-center items-center mt-5'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => handleSubmit(data, form.reset, isEditing))} className="flex flex-col justify-center items-center w-full gap-4">

          <FormInput
            control={form.control}
            label="categories"
            options={categories} // 드롭다운 옵션
          />
          <FormInput control={form.control} label={'title'} />
          <FormInput control={form.control} label={'writer'} />
          <FormInput control={form.control} label={'contents'} />
          <FormInput control={form.control} label={'tags'} />


          <div className='flex justify-between items-center w-full gap-2 mt-4'>
            <Button variant='secondary' type='button' className="w-full" onClick={handleHome}>
              back
            </Button>
            <Button type="submit" className="w-full">
              {isEditing ? 'Edit' : 'Add a post'}
            </Button>
          </div>

        </form>
      </Form>
    </div>
  );
};

export default PostForm;

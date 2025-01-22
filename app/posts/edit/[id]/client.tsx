'use client'
import PostCard from '@/components/posts/card';
import EditPostForm from '@/components/posts/form/edit-form';
import { usePostAction } from '@/hooks/usePostAction';
import { Post } from '@/types/post';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const EditClient = () => {


  return (
    <div>
      <EditPostForm />
    </div>
  )
}

export default EditClient
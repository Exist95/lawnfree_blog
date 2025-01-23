import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export type PostFormValues = z.infer<typeof postSchema>

const postSchema = z.object({
  title: z.string().min(1, { message: '제목은 필수 항목입니다.' }).max(20, { message: '제목은 20자 이하여야 합니다.' }),
  contents: z.string().min(1, { message: '내용은 필수 항목입니다.' }).max(200, { message: '내용은 200자 이하여야 합니다.' }),
  author: z.string().min(1, { message: '글쓴이는 필수 항목입니다.' }).max(5, { message: '글쓴이는 5자 이하여야 합니다.' }),
  date: z.string().optional(),
  likes: z.boolean().optional(),
  categories: z.string().min(1, { message: '카테고리는 필수 항목입니다.' }).max(5, { message: '카테고리는 5자 이하여야 합니다.' }),
  tags: z.array(z.string()).optional(),
});

const usePostForm = () => {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      contents: '',
      author: '',
      date: '',
      likes: false,
      categories: 'Free',
      tags: [],
    },
  });

  return form;
};

export default usePostForm;

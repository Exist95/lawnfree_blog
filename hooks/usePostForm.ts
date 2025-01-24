import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from './use-toast';
import { usePostStore } from '@/store/usePostStore';
import { usePostAction } from './usePostAction';
import { formatDate } from '@/lib/format';

export type PostFormValues = z.infer<typeof postSchema>

const postSchema = z.object({
  title: z.string().min(1, { message: 'The title is required.' }).max(20, { message: 'The title must be no more than 20 characters long.' }),
  contents: z.string().min(1, { message: 'The content is required.' }).max(200, { message: 'The content must be no more than 200 characters.' }),
  writer: z.string().min(1, { message: 'The writer is required.' }).max(5, { message: 'The writer must be no more than 5 characters.' }),
  date: z.string().optional(),
  likes: z.boolean().optional(),
  categories: z.string().min(1, { message: 'The category is required.' }),
  tags: z.string().max(10, { message: 'Tag must be no more than 10 characters long.' }).optional(),
});

const usePostForm = (id?: string, post?: PostFormValues | null) => {
  const { toast } = useToast();
  const { addPost, updatePost } = usePostStore();
  const { handleHome } = usePostAction();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      contents: '',
      writer: '',
      date: '',
      likes: false,
      categories: 'Free',
      tags: '',
    },
  });

  const handleSubmit = (data: PostFormValues, resetForm: () => void, isEditing: boolean) => {

    if (isEditing) {
      const updatedPost = {
        id: Number(id),
        ...data, // 폼 데이터 구조가 동일하므로 스프레드 연산자로 처리
        date: post?.date || formatDate(new Date().toISOString()),
        likes: post?.likes || false,
      };

      updatePost(Number(id), updatedPost);
      toast({
        description: "The post has been modified.",
      });
    } else {
      const newPost = {
        id: Date.now(),
        ...data,
        date: formatDate(new Date().toISOString()),
        likes: false,
      };

      addPost(newPost);
      toast({
        description: "Your post has been registered.",
      });
    }

    resetForm(); // 폼 초기화
    handleHome();
  };

  return { form, handleSubmit };
};

export default usePostForm;

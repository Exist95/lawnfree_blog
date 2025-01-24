import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from './use-toast';
import { usePostStore } from '@/store/usePostStore';
import { usePostAction } from './usePostAction';
import { formatDate } from '@/lib/format';

export type PostFormValues = z.infer<typeof postSchema>

export const MAX_TITLE_LENGTH = 20
export const MAX_CONTENT_LENGTH = 200
export const MAX_WRITER_LENGTH = 5
export const MAX_TAG_LENGTH = 10

const postSchema = z.object({
  title: z.string().min(1, { message: 'The title is required.' }).max(MAX_TITLE_LENGTH, { message: `The title must be no more than ${MAX_TITLE_LENGTH} characters long.` }),
  contents: z.string().min(1, { message: 'The content is required.' }).max(MAX_CONTENT_LENGTH, { message: `The content must be no more than ${MAX_CONTENT_LENGTH} characters.` }),
  writer: z.string().min(1, { message: 'The writer is required.' }).max(MAX_WRITER_LENGTH, { message: `The writer must be no more than ${MAX_WRITER_LENGTH} characters.` }),
  tags: z.string().max(MAX_TAG_LENGTH, { message: `Tag must be no more than ${MAX_TAG_LENGTH} characters long.` }).optional(),
  date: z.string().optional(),
  likes: z.boolean().optional(),
  categories: z.string().min(1, { message: 'The category is required.' }),

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

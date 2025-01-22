import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


export type PostFormValues = z.infer<typeof postSchema>


const postSchema = z.object({
  title: z.string().min(1, { message: '제목은 필수 항목입니다.' }),
  content: z.string().min(1, { message: '내용은 필수 항목입니다.' }),
  author: z.string().min(1, { message: '글쓴이는 필수 항목입니다.' }),
});

const usePostForm = () => {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
      author: '',
    },
  });

  return form;
};

export default usePostForm;

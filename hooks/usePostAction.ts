import { usePostStore } from "@/store/usePostStore"
import { toast } from "./use-toast";
import { useRouter } from "next/navigation";

export const usePostAction = () => {
  const route = useRouter();
  const { posts, setPosts, updatePost, removePost, updatePostLikes, loadPosts } = usePostStore()

  /**
  상세페이지로 이동
  */
  const handleDetailPage = (postId: number) => {
    route.push(`/posts/${postId}`);
  }

  /**
  수정페이지로 이동
  */
  const handleEditPage = (postId: number) => {
    route.push(`/posts/edit/${postId}`);
  }

  /**
  홈으로 돌아가기
  */
  const handleHome = () => {
    route.push('/')
  }

  /**
  새로고침 후 홈으로 돌아가기
  */

  const handleRefreshHome = () => {
    location.href = '/';
  }

  /**
  게시물 삭제 함수
  */
  const handleDelete = async (postId: number) => {
    try {
      await removePost(postId);
      toast({
        description: "Your post has been deleted.",
      });

    } catch (error) {
      toast({
        description: "Failed to delete the post.",
      });
    }
    handleHome();
  };


  return {
    posts, loadPosts, setPosts, updatePost, removePost, updatePostLikes, handleDelete, handleEditPage, handleDetailPage, handleHome, handleRefreshHome
  }
}
import { usePostStore } from "@/store/usePostStore"

export const usePostAction = () => {
  const { posts, setPosts, updatePost, removePost, updatePostLikes, loadPosts } = usePostStore()

  return {
    posts, loadPosts, setPosts, updatePost, removePost, updatePostLikes
  }
}
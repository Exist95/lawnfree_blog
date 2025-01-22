import { PostStore } from "@/types/post";
import { create } from "zustand";



export const usePostStore = create<PostStore>((set) => ({
  posts: [],

  addPost: (post) => {
    set((state) => {
      const updatedPosts = [...state.posts, post];
      localStorage.setItem('posts', JSON.stringify(updatedPosts)); // 로컬 스토리지에 저장
      return { posts: updatedPosts };
    });
  },

  // 게시글 수정
  updatePost: (id, updatedPost) =>
    set((state) => {
      const updatedPosts = state.posts.map((post) =>
        post.id === id ? { ...post, ...updatedPost } : post
      );
      localStorage.setItem('posts', JSON.stringify(updatedPosts)); // 로컬 스토리지에 저장
      return { posts: updatedPosts };
    }),

  // 게시글 삭제
  removePost: (id) =>
    set((state) => {
      const updatedPosts = state.posts.filter((post) => post.id !== id);
      localStorage.setItem('posts', JSON.stringify(updatedPosts)); // 로컬 스토리지에 저장
      return { posts: updatedPosts };
    }),


  // 게시글 좋아요
  updatePostLikes: (id) =>
    set((state) => {
      const updatedPosts = state.posts.map((post) =>
        post.id === id ? { ...post, likes: !post.likes } : post // likes 상태 토글
      );
      localStorage.setItem('posts', JSON.stringify(updatedPosts)); // 로컬 스토리지에 저장
      return { posts: updatedPosts };
    }),

  // 로컬 스토리지에서 게시글 불러오기
  loadPosts: () => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      set({ posts: JSON.parse(storedPosts) });
    }
  },

  setPosts: (newPosts) => {
    set(() => {
      localStorage.setItem("posts", JSON.stringify(newPosts));
      return { posts: newPosts };
    });
  },
}));
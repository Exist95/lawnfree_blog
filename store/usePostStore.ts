import { IPost, IPostStore } from "@/types/post";
import { create } from "zustand";



export const usePostStore = create<IPostStore>((set) => ({
  posts: [],

  // 게시글 추가
  addPost: (post: IPost) => {
    set((state) => {
      const addedPosts = [post, ...state.posts];
      try {
        localStorage.setItem('posts', JSON.stringify(addedPosts));
      } catch (error) {
        console.error("Failed to added posts", error);
      }
      return { posts: addedPosts };
    });
  },

  // 게시글 수정
  updatePost: (id: number, post: IPost) => {
    set((state) => {
      const updatedPosts = state.posts.map((item) =>
        item.id === id ? { ...item, ...post } : item
      );
      try {
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
      } catch (error) {
        console.error("Failed to updated posts", error);
      }
      return { posts: updatedPosts };
    });
  },

  // 게시글 삭제
  removePost: (id) =>
    set((state) => {
      const removedPosts = state.posts.filter((post) => post.id !== id);
      try {
        localStorage.setItem('posts', JSON.stringify(removedPosts));
      } catch (error) {
        console.error("Failed to removed posts", error);
      }
      return { posts: removedPosts };
    }),


  // 게시글 좋아요
  updatePostLikes: (id) =>
    set((state) => {
      const likedPosts = state.posts.map((post) =>
        post.id === id ? { ...post, likes: !post.likes } : post
      );
      try {
        localStorage.setItem('posts', JSON.stringify(likedPosts));
      } catch (error) {
        console.error("Failed to liked posts", error);
      }
      return { posts: likedPosts };
    }),

  // 로컬 스토리지에서 게시글 불러오기
  loadPosts: () => {
    try {
      const storedPosts = localStorage.getItem('posts');
      if (storedPosts) {
        set({ posts: JSON.parse(storedPosts) });
      }
    } catch (error) {
      console.error("Failed to load posts", error);
    }
  },

  // 로컬 스토리지에서 초기 데이터 가져오기
  setPosts: (newPosts) => {
    set(() => {
      try {
        localStorage.setItem("posts", JSON.stringify(newPosts));
      } catch (error) {
        console.error("Failed to setPosts", error);
      }
      return { posts: newPosts };
    });
  },
}));
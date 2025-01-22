export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: boolean;
}

export interface PostStore {
  posts: Post[];
  addPost: (post: Post) => void;
  removePost: (id: number) => void;
  updatePost: (id: number, post: Post) => void;
  updatePostLikes: (id: number) => void;
  loadPosts: () => void;
  setPosts: (posts: Post[]) => void; // 게시글 목록 설정
}
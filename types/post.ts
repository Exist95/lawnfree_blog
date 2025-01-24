export interface IPost {
  id: number;
  title: string;
  contents: string;
  writer: string;
  date: string;
  likes: boolean;
  categories: string;
  tags?: string;
}

export interface IPostStore {
  posts: IPost[];
  addPost: (post: IPost) => void;
  removePost: (id: number) => void;
  updatePost: (id: number, post: IPost) => void;
  updatePostLikes: (id: number) => void;
  loadPosts: () => void;
  setPosts: (posts: IPost[]) => void; // 게시글 목록 설정
}
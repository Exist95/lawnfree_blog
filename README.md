## 프로젝트 소개

Lawnfree Blog는 Next.js, Tailwind CSS, Zustand, Shadcn/ui 등의 스택을 사용하여 심플하고 직관적인 인터페이스를 제공하는 웹 애플리케이션입니다.

## 실행 방법

1. 레포지토리를 클론합니다.

```bash
git clone https://github.com/username/lawnfree_blog.git
cd lawnfree_blog
```

2. 의존성을 설치합니다.

```bash
npm install
```

3. 개발 서버를 실행합니다.

```bash
npm run dev
```

4. 브라우저에서 http://localhost:3000에 접속하여 애플리케이션을 확인합니다.

## 사용한 Shadcn/ui 컴포넌트 목록

- Badge
- Button
- Card
- Dropdown-menu
- Form
- Input
- Label
- Pagination
- Select
- Table
- Textarea
- Toast
- Tooltip

## 상태 관리 방식 설명

이 프로젝트에서는 Zustand를 사용하여 게시물 상태를 관리합니다. 또한 상태를 로컬스토리지에 저장하여 사용자가 페이지를 새로고침하더라도 이전 상태를 유지할 수 있도록 구현했습니다. 로컬스토리지에서는 'posts'라는 key로 저장되어있으므로 게시물 데이터를 확인하실 때 참조하시면 됩니다.

게시물 상태 관리는 아래와 같이 구성되어있습니다.

1. 게시물 추가 (addPost)

```
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
```

2. 게시물 수정 (updatePost)

```
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
```

3. 게시물 삭제 (removePost)

```
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
```

4. 게시물 좋아요 (updatePostLikes)

```
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
```

5. 게시물 불러오기 (loadPosts)

```
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
```

6. 게시물 초기 상태 불러오기 (setPosts)

```
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
```

## 커밋 컨벤션

```
feat: adding new features
fix: fix a bug
docs: document modification
style: Style-related features (if code formatting, missing semicolons, no changes in code itself)
refactor: code refactoring
test: Add test code
chore: Modify build job, modify package manager (ex. modify gitignore)
```

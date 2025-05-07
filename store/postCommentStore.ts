//  store/postCommentStore.ts



import { create } from 'zustand';

interface Comment {
  user: string;
  comment: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  role: string;
  comments: Comment[];
  image?: string;
  isPinned?: boolean;
  likes?: number;
}

interface PostCommentState {
  posts: Post[];
  users: { id: string; name: string }[];
  addUser: (user: { id: string; name: string }) => void;
  initializePosts: (posts: Post[]) => void;
  addPost: (post: Omit<Post, 'id' | 'author' | 'role' | 'comments' | 'likes'>) => void;
  addComment: (postId: number, comment: string) => void;
}

export const usePostCommentStore = create<PostCommentState>((set) => ({
  posts: [],
  users: [],
  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),
  initializePosts: (posts) =>
    set(() => ({
      posts: posts.map((p, i) => ({
        ...p,
        id: i + 1,
        likes: p.likes || 0,
        comments: p.comments || [],
      })),
    })),
  addPost: (newPost) =>
    set((state) => ({
      posts: [
        ...state.posts,
        {
          id: state.posts.length + 1,
          author: 'Student', // default author
          role: 'student',
          likes: 0,
          comments: [],
          ...newPost,
        },
      ],
    })),
  addComment: (postId, commentText) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, { user: 'Anonymous', comment: commentText }],
            }
          : post
      ),
    })),
}));

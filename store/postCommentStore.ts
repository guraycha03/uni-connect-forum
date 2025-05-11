//  store/postCommentStore.ts



// store/postCommentStore.ts

import { create } from 'zustand';

interface Comment {
  user: string;
  comment: string;
}

interface Post {
  id: string;
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
  initializePosts: (posts: Omit<Post, 'id'>[]) => void;
  addPost: (post: Omit<Post, 'id' | 'author' | 'role' | 'comments' | 'likes'>) => void;
  addComment: (postId: string, comment: string) => void;
  deletePost: (postId: string) => void;
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
      posts: posts.map((p) => ({
        ...p,
        id: crypto.randomUUID(),
        likes: p.likes || 0,
        comments: p.comments || [],
      })),
    })),

  addPost: (newPost) =>
    set((state) => ({
      posts: [
        ...state.posts,
        {
          id: crypto.randomUUID(),
          author: 'Student',
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

  deletePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    })),
}));

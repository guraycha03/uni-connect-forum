//  store/postCommentStore.ts



import { create } from 'zustand';

interface Comment {
    id: string;
    content: string;
}

interface Post {
    id: string;
    title: string;
    comments: Comment[];
}

interface User {
    id: string;
    name: string;
}

interface PostCommentState {
    posts: Post[];
    users: User[];
    addPost: (post: Post) => void;
    addUser: (user: User) => void;
}

export const usePostCommentStore = create<PostCommentState>((set) => ({
    posts: [],
    users: [],
    addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
    addUser: (user) => set((state) => ({ users: [...state.users, user] })),
}));

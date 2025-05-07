//  store/postCommentStore.ts



// store/postCommentStore.ts

import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid'; // Import for generating unique IDs

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
    addPost: (title: string) => void; // Update addPost to take title
    addUser: (name: string) => void;   // Update addUser to take name
    addCommentToPost: (postId: string, content: string) => void;
}

export const usePostCommentStore = create<PostCommentState>((set, get) => ({
    posts: [],
    users: [],
    addPost: (title) => {
        const newPost: Post = {
            id: uuidv4(),
            title,
            comments: [],
        };
        set((state) => ({ posts: [...state.posts, newPost] }));
    },
    addUser: (name) => {
        const newUser: User = {
            id: uuidv4(),
            name,
        };
        set((state) => ({ users: [...state.users, newUser] }));
    },
    addCommentToPost: (postId, content) => {
        const newComment: Comment = {
            id: uuidv4(),
            content,
        };
        set((state) => ({
            posts: state.posts.map((post) =>
                post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
            ),
        }));
    },
}));
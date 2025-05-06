// app/posts/page.tsx   ← List of posts



// app/posts/page.tsx   ← List of posts

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Pin, MessageCircle, PlusCircle, XCircle } from 'lucide-react';
import { usePostCommentStore } from '@/store/postCommentStore'; // Adjust import path

interface Comment {
    user: string;
    comment: string;
}

interface Post {
    id: number;
    author: string;
    role: string;
    title: string;
    content: string;
    comments: Comment[];
    image?: string;
    isPinned?: boolean;
    likes?: number;
}

const getInitialPosts = (): Post[] => {
    return [
        {
            id: 1,
            author: 'Prof. Marie Gonzales',
            role: 'moderator',
            title: '🎉 Welcome to UniConnect Forum! 🎓',
            content:
                'This platform is created to empower every student and faculty member to share knowledge, updates, and insights. Let’s keep the discussions respectful and helpful!',
            comments: [
                { user: 'Jonathan', comment: 'This is awesome! Thank you for this initiative.' },
                { user: 'Irene', comment: 'Looking forward to productive discussions!' },
            ],
            isPinned: true,
            image: '/images/posts/1.png',
            likes: 5,
        },
        {
            id: 2,
            author: 'Kaye Santos',
            role: 'student',
            title: '📢 Lost & Found Alert!',
            content: 'Found a black umbrella with a red handle in the library study area. Message me if it’s yours.',
            comments: [{ user: 'Marco', comment: 'That’s mine! I’ll PM you, thanks!' }],
            image: 'https://source.unsplash.com/random/800x400/?umbrella,lost,found',
            likes: 2,
        },
        {
            id: 3,
            author: 'Student 1',
            role: 'student',
            title: 'Question about Midterm Exam',
            content:
                'Hi everyone, I have a question about the upcoming midterm exam. Does anyone know what chapters will be covered? Also, is there a study group I can join?',
            comments: [
                { user: 'Student 2', comment: 'I heard chapters 3-5 will be on the exam.' },
                { user: 'Student 3', comment: 'There\'s a study group meeting on Friday in the library!' },
            ],
            likes: 7,
        },
        {
            id: 4,
            author: 'Professor Smith',
            role: 'moderator',
            title: 'Office Hours Announcement',
            content:
                'My office hours for this week will be on Tuesday and Thursday from 2-4 PM. Please come by if you have any questions about the course material.',
            comments: [],
            isPinned: true,
            likes: 12,
        },
        {
            id: 5,
            author: 'Club President',
            role: 'student',
            title: 'Volunteer Opportunity',
            content:
                'The Environmental Club is looking for volunteers for our upcoming tree planting event. It will be on Saturday from 9 AM to 12 PM. Lunch will be provided!',
            comments: [{ user: 'Student 4', comment: 'I\'d love to volunteer! Where is the meeting location?' }],
            image: 'https://source.unsplash.com/random/800x400/?tree,planting,volunteer',
            likes: 20,
        },
    ];
};

const PostsPage = () => {
    const posts = usePostCommentStore((state) => state.posts);
    const addPost = usePostCommentStore((state) => state.addPost);
    const addCommentToStore = usePostCommentStore((state) => state.addComment);
    const initializePosts = usePostCommentStore((state) => state.initializePosts);
    const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [newPost, setNewPost] = useState<Omit<Post, 'id' | 'comments' | 'likes' | 'author' | 'role'>>({
        title: '',
        content: '',
        image: undefined,
    });
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        // Fetch initial posts here and then call initializePosts
        const initialData = getInitialPosts();
        initializePosts(initialData);
    }, [initializePosts]);

    const handleAddPost = () => {
        if (newPost.title.trim() && newPost.content.trim()) {
            addPost(newPost);
            setIsCreatingPost(false);
            setNewPost({ title: '', content: '', image: undefined });
        } else {
            alert('Please fill in both title and content!');
        }
    };

    const handleAddComment = (postId: number) => {
        if (newComment.trim()) {
            addCommentToStore(postId, newComment);
            setNewComment('');
            setExpandedPostId(null);
        }
    };

    const toggleExpand = (id: number) => {
        setExpandedPostId((prev) => (prev === id ? null : id));
    };

    const handleLike = (postId: number) => {
        // You might want to update likes in the store as well for global consistency
        // const updateLike = usePostCommentStore((state) => state.updateLike);
        // updateLike(postId);
        setPosts((prev) =>
            prev.map((p) => (p.id === postId ? { ...p, likes: (p.likes || 0) + 1 } : p))
        );
    };

    const handleShare = (postId: number) => {
        alert(`Shared post ${postId}!`);
    };

    const handlePin = (postId: number) => {
        // You might want to update pin status in the store as well
        setPosts((prev) => {
            const updated = prev.map((p) => (p.id === postId ? { ...p, isPinned: !p.isPinned } : p));
            return [...updated].sort((a, b) => {
                if (a.isPinned && !b.isPinned) return -1;
                if (!a.isPinned && b.isPinned) return 1;
                return a.id - b.id;
            });
        });
    };

    const sortedPosts = [...posts].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return a.id - b.id;
    });

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="post-container">
                <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">📬 Forum Posts & Announcements</h1>

                <button
                    onClick={() => setIsCreatingPost(!isCreatingPost)}
                    className="mb-6 bg-maroon-600 hover:bg-maroon-700 text-white font-semibold rounded-md px-4 py-2 flex items-center gap-2"
                >
                    {isCreatingPost ? (
                        <>
                            <XCircle className="w-5 h-5" /> Cancel
                        </>
                    ) : (
                        <>
                            <PlusCircle className="w-5 h-5" /> Create Post
                        </>
                    )}
                </button>

                {isCreatingPost && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="mb-6 bg-white p-4 rounded-md shadow"
                    >
                        <div className="space-y-4">
                            <input
                                placeholder="Title"
                                value={newPost.title}
                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                className="w-full border px-3 py-2 rounded-md"
                            />
                            <textarea
                                placeholder="Content"
                                value={newPost.content}
                                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                className="w-full border px-3 py-2 rounded-md"
                            />
                            <input
                                placeholder="Image URL (optional)"
                                value={newPost.image || ''}
                                onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                                className="w-full border px-3 py-2 rounded-md"
                            />
                            <div className="text-right">
                                <button
                                    onClick={handleAddPost}
                                    className="bg-maroon-600 hover:bg-maroon-800 text-white px-4 py-2 rounded-md"
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                <div className="space-y-6">
                    {sortedPosts.map((post) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="post-card bg-white rounded-md shadow-md p-4"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h2
                                        className="text-lg font-semibold text-maroon-800 cursor-pointer hover:underline"
                                        onClick={() => toggleExpand(post.id)}
                                    >
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-gray-600 italic">{post.author} ({post.role})</p>
                                </div>
                                {post.role === 'moderator' && (
                                    <button onClick={() => handlePin(post.id)} title="Pin post">
                                        <Pin className="w-4 h-4 text-yellow-600" />
                                    </button>
                                )}
                            </div>

                            {post.image && (
                                <img
                                    src={post.image}
                                    alt={`Image for ${post.title}`}
                                    className="post-thumbnail rounded-md mb-4"
                                />
                            )}

                            <p className="text-gray-700 mb-4">{post.content}</p>

                            {post.comments.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">💬 Comments</h4>
                                    <ul className="space-y-2">
                                        {post.comments.map((comment, index) => (
                                            <li
                                                key={index}
                                                className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-sm"
                                            >
                                                <span className="font-semibold">{comment.user}:</span> {comment.comment}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="mb-2 mt-2">
                                <textarea
                                    placeholder="Write a comment..."
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                    rows={2}
                                    value={post.id === expandedPostId ? newComment : ''}
                                    onChange={(e) => {
                                        setExpandedPostId(post.id);
                                        setNewComment(e.target.value);
                                    }}
                                />
                                <div className="text-right mt-2">
                                    <button
                                        onClick={() => handleAddComment(post.id)}
                                        className="bg-maroon-600 hover:bg-maroon-800 text-white px-4 py-1.5 rounded-md text-sm"
                                    >
                                        Post Comment
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    onClick={() => handleLike(post.id)}
                                    className="text-red-500 hover:text-red-700 flex items-center gap-1"
                                >
                                    <Heart className="w-4 h-4" /> {post.likes || 0}
                                </button>
                                <button
                                    onClick={() => handleShare(post.id)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <Share2 className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostsPage;
// app/posts/page.tsx   ← List of posts & Dashboard



// app/posts/page.tsx   ← List of posts & Dashboard


'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, Pin, Trash2, PlusCircle, XCircle, Edit, CheckCircle } from 'lucide-react';
import { create } from 'zustand';
import { cn } from "@/lib/utils"
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Comment {
    user: string;
    comment: string;
}

interface Post {
    id: string;
    author: string;
    role: string;
    title: string;
    content: string;
    comments: Comment[];
    image?: string;
    isPinned?: boolean;
    likes?: number;
    edited?: boolean;
}

interface User {
    id: string;
    name: string;
}

interface PostCommentState {
    posts: Post[];
    users: User[];
    initializePosts: (posts: Omit<Post, 'id'>[]) => void;
    addPost: (post: Omit<Post, 'id' | 'author' | 'role' | 'comments' | 'likes'>) => void;
    addComment: (postId: string, comment: string) => void;
    updateLike: (postId: string) => void;
    pinPost: (postId: string) => void;
    deletePost: (postId: string) => void;
    updatePost: (postId: string, updatedPost: Partial<Omit<Post, 'id' | 'author' | 'role' | 'comments' | 'likes'>>) => void;
    initializeUsers: (users: User[]) => void;
}

const usePostCommentStore = create<PostCommentState>((set, get) => ({
    posts: [],
    users: [],
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
                    {
                        id: crypto.randomUUID(),
                        author: 'Bulan State University', 
                        role: 'university',
                        likes: 0,
                        comments: [],
                        ...newPost,
                    },
                    ...state.posts,
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

    updateLike: (postId) =>
        set((state) => ({
            posts: state.posts.map((post) =>
                post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
            ),
        })),

    pinPost: (postId) => {
        set(state => ({
            posts: state.posts.map(post =>
                post.id === postId ? { ...post, isPinned: !post.isPinned } : post
            )
        }));
    },
    deletePost: (postId) => {
        set(state => ({
            posts: state.posts.filter(post => post.id !== postId)
        }));
    },
    updatePost: (postId, updatedPost) => {
        set(state => ({
            posts: state.posts.map(post =>
                post.id === postId ? { ...post, ...updatedPost, edited: true } : post
            )
        }));
    },
    initializeUsers: (users) => set({ users }),
}));

const PostsPage = () => {
    const { posts, addPost, addComment: addCommentToStore, initializePosts, updateLike, pinPost, deletePost, updatePost, initializeUsers, users } = usePostCommentStore();
    const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [newPost, setNewPost] = useState<Omit<Post, 'id' | 'comments' | 'likes' | 'author' | 'role'>>({
        title: '',
        content: '',
        image: undefined,
    });
    const [newComment, setNewComment] = useState('');
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    const [editedPostContent, setEditedPostContent] = useState('');

    // --- Mock Data for demonstration ---
    const mockInitialPosts: Omit<Post, 'id'>[] = [
        {
            author: 'Moderator',
            role: 'moderator',
            title: '🎉 Welcome to UniConnect Forum! 🎓',
            content:
                'This platform is created to empower every student and faculty member to share knowledge, updates, and insights. Let’s keep the discussions respectful and helpful!\n\nHere, you can:\n\n* Share posts and comments with fellow students\n* Receive important updates from moderators\n* Access academic tools and resources\n\nReminder: Please keep your posts respectful and relevant. Moderators are here to ensure a safe and informative environment.\n\nStay tuned for upcoming features and announcements!\n\n#BSUPortal #StudentUpdates #CampusLife',
            comments: [
                { user: 'Jonathan', comment: 'This is awesome! Thank you for this initiative.' },
                { user: 'Irene', comment: 'Looking forward to productive discussions!' },
            ],
            isPinned: true,
            image: '/images/posts/1.png',
            likes: 5,
        },
        {
            author: 'Moderator',
            role: 'moderator',
            title: '📢 Lost & Found Alert!',
            content: 'Found a black umbrella with a red handle in the library study area. Message me if it’s yours.',
            comments: [{ user: 'Marco', comment: 'That’s mine! I’ll PM you, thanks!' }],
            image: 'https://source.unsplash.com/random/800x400/?umbrella,lost,found',
            likes: 2,
        },
        {
            author: 'Moderator',
            role: 'moderator',
            title: 'Question about Midterm Exam',
            content:
                'Hi everyone, I have a question about the upcoming midterm exam.\n\nDoes anyone know what chapters will be covered? Also, is there a study group I can join?',
            comments: [
                { user: 'Student 2', comment: 'I heard chapters 3-5 will be on the exam.' },
                { user: 'Student 3', comment: 'There\'s a study group meeting on Friday in the library!' },
            ],
            likes: 7,
        },
        {
            author: 'Moderator',
            role: 'moderator',
            title: 'Office Hours Announcement',
            content:
                'My office hours for this week will be on Tuesday and Thursday from 2-4 PM.\nPlease come by if you have any questions about the course material.',
            comments: [],
            isPinned: true,
            likes: 12,
        },
        {
            author: 'Moderator',
            role: 'moderator',
            title: 'Volunteer Opportunity',
            content:
                'The Environmental Club is looking for volunteers for our upcoming tree planting event.\n\nIt will be on Saturday from 9 AM to 12 PM. Lunch will be provided!',
            comments: [{ user: 'Student 4', comment: 'I\'d love to volunteer! Where is the meeting location?' }],
            image: 'https://source.unsplash.com/random/800x400/?tree,planting,volunteer',
            likes: 20,
        },
    ];

    const mockUsers: User[] = [
        { id: '1', name: 'Miguel' },
        { id: '2', name: '"Angelica ' },
        { id: '3', name: '"Daniel ' },
        { id: '4', name: '"Mark ' },
        { id: '5', name: '"Janine ' },
        { id: '6', name: '"Ella ' },
        { id: '7', name: '"Andrew ' },
        { id: '8', name: '"Patricia ' },
        { id: '9', name: '"Justin ' },
        { id: '10', name: '"Luisa ' },
        { id: '11', name: '"Ronald ' },
        { id: '12', name: '"Sophia ' },
        { id: '13', name: '"Joseph ' },
        { id: '14', name: '"Bea ' },
        { id: '15', name: '"Ryan ' },
        { id: '16', name: '"Katrina ' },
        { id: '17', name: '"Enzo ' },
        { id: '18', name: '"Charmaine ' },
        { id: '19', name: '"Daryl ' },
        { id: '20', name: 'Thomas' },
    ];

    useEffect(() => {
        const savedPosts = localStorage.getItem('forumPosts');
        let initialData: Omit<Post, 'id'>[] = [];
    
        try {
            if (savedPosts) {
                initialData = JSON.parse(savedPosts);
            } else {
                initialData = mockInitialPosts; 
            }
        } catch (error) {
            console.error("Failed to parse stored posts:", error);
            localStorage.removeItem('forumPosts');
            initialData = mockInitialPosts;
        }
    
        initializePosts(initialData); 
        initializeUsers(mockUsers);
    }, [initializePosts, initializeUsers]);
    
    useEffect(() => {
        if (posts.length > 0) {
            localStorage.setItem('forumPosts', JSON.stringify(posts));
        }
    }, [posts]);

    const handleAddPost = () => {
        if (newPost.title.trim() && newPost.content.trim()) {
            addPost(newPost);
            setIsCreatingPost(false);
            setNewPost({ title: '', content: '', image: undefined });
        } else {
            alert('Please fill in both title and content!');
        }
    };

    const handleAddComment = (postId: string) => {
        if (newComment.trim()) {
            addCommentToStore(postId, newComment);
            setNewComment('');
            setExpandedPostId(null);
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedPostId((prev) => (prev === id ? null : id));
    };

    const handleLikeClick = (postId: string) => {
        updateLike(postId);
    };

    const handleShare = (postId: string) => {
        alert(`Shared post ${postId}!`);
    };

    const handlePinClick = (postId: string) => {
        pinPost(postId);
    };

    const handleDeletePost = (postId: string) => {
        deletePost(postId);
    };

    const handleEditPost = (postId: string, currentContent: string) => {
        setEditingPostId(postId);
        setEditedPostContent(currentContent);
    };

    const handleSavePost = (postId: string) => {
        if (editedPostContent.trim()) {
            updatePost(postId, { content: editedPostContent });
            setEditingPostId(null);
            setEditedPostContent('');
        } else {
            alert('Please enter content before saving.');
        }
    };

    const sortedPosts = [...posts].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return 0;
    });

    // --- ApexCharts Data and Options ---
    const [chartData, setChartData] = useState({
        series: [
            {
                name: 'Data',
                data: [posts.length, posts.reduce((acc, post) => acc + post.comments.length, 0), users.length],
            },
        ],
        options: {
            chart: {
                type: 'bar', 
                height: 350,
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350
                    }
                }
            },
            colors: ['#8b0000', '#b22222', '#dc143c'], 
            plotOptions: {
                bar: {
                    borderRadius: 8,
                    dataLabels: {
                        position: 'top', 
                    },
                },
            },
            dataLabels: {
                enabled: true,
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#301e1e"]
                }
            },
            xaxis: {
                categories: ['Posts', 'Comments', 'Students'],
                title: {
                    text: 'Category',
                    style: {
                        color: '#4b5563'
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Count',
                    style: {
                        color: '#4b5563'
                    }
                },
                labels: {
                    formatter: (val: number) => {
                        return val;
                    }
                }
            },
            title: {
                text: 'Posts, Comments, and Students Overview',
                align: 'center',
                style: {
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#1f2937'
                }
            },
            tooltip: {
                y: {
                    formatter: function (val: number) {
                        return val;
                    }
                }
            },
        },
    });

    useEffect(() => {
        setChartData(prevData => ({
            ...prevData,
            series: [
                {
                    name: 'Data',
                    data: [posts.length, posts.reduce((acc, post) => acc + post.comments.length, 0), users.length],
                },
            ],
        }));
    }, [posts.length, users.length]);

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="post-container">
                <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">📬 Forum Posts & Announcements</h1>

                <div className="create-post-button-container mb-8">
                    <button
                        onClick={() => setIsCreatingPost(!isCreatingPost)}
                        className="bg-maroon-600 hover:bg-maroon-700 text-white font-semibold rounded-md px-4 py-2 flex items-center gap-2"
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
                </div>

                <AnimatePresence>
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
                                    className="w-full border px-3 py-2 rounded-md text-black" 


                                />
                                <textarea
                                    placeholder="Content"
                                    value={newPost.content}
                                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                    className="w-full border px-3 py-2 rounded-md"
                                    rows={4} 
                                />
                                <input
                                    placeholder="Image URL (optional)"
                                    value={newPost.image || ''}
                                    onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                                    className="w-full border px-3 py-2 rounded-md"
                                />
                                <p className="text-sm text-gray-500">
                                    Use Shift+Enter for line breaks.
                                </p>
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
                </AnimatePresence>

                <div className="posts-list space-y-8">
                    <AnimatePresence>
                        {sortedPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="post-card bg-white rounded-md shadow-md p-4 relative"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h2
                                            className="text-lg font-semibold text-black cursor-pointer hover:underline"
                                            onClick={() => toggleExpand(post.id)}
                                        >
                                            {post.title}
                                        </h2>

                                        <p className="text-sm text-gray-600 italic">{post.author} ({post.role})</p>
                                        {post.edited && <p className="text-xs text-gray-500 italic">Edited</p>}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handlePinClick(post.id)}
                                            title="Pin post"
                                        >
                                            <Pin className={cn("w-4 h-4", post.isPinned ? "text-yellow-600" : "text-gray-500")} />
                                        </button>
                                        {editingPostId === post.id ? (
                                            <button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleSavePost(post.id)}
                                                title="Save Post"
                                            >
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                            </button>
                                        ) : (
                                            <button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEditPost(post.id, post.content)}
                                                title="Edit Post"
                                            >
                                                <Edit className="w-4 h-4 text-gray-500 hover:text-blue-500" />
                                            </button>
                                        )}
                                        <button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDeletePost(post.id)}
                                            title="Delete Post"
                                        >
                                            <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
                                        </button>
                                    </div>
                                </div>

                                {post.image && (
                                    <img
                                        src={post.image}
                                        alt={`Image for ${post.title}`}
                                        className="post-thumbnail rounded-md mb-4 w-full h-auto object-cover"
                                    />
                                )}

                                {editingPostId === post.id ? (
                                    <textarea
                                        value={editedPostContent}
                                        onChange={(e) => setEditedPostContent(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
                                        rows={4}
                                        placeholder="Edit your post content..."
                                    />
                                ) : (
                                    <p className="text-gray-700 mb-4 whitespace-pre-line">{post.content}</p>
                                )}

                                {post.comments.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">💬 Comments</h4>
                                        <ul className="space-y-2 list-none">
                                            {post.comments.map((comment, index) => (
                                                <li
                                                key={index}
                                                className="bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm"
                                            >
                                                <span className="font-semibold">{comment.user}:</span> {comment.comment}
                                                </li>
                                            
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="mb-4 mt-3">
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
                                            className="bg-maroon-600 hover:bg-maroon-800 text-white px-4 py-1.5 rounded-md text-sm comment-button-spacing"
                                        >
                                            Post Comment
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center button-spacing">
                                    <button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleLikeClick(post.id)}
                                        className="text-red-500 hover:text-red-700 flex items-center gap-1"
                                    >
                                        <Heart className="w-4 h-4" /> {post.likes || 0}
                                    </button>
                                    <button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleShare(post.id)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                {/* Chart Display */}
                <div className="mt-8">
                    <Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="bar" 
                        height={350}
                    />
                </div>
            </div>
            <style jsx>{`
                .create-post-button-container {
                    margin-bottom: 2rem;
                }

                .posts-list > * + * {
                    margin-top: 2.5rem;
                }

                .comment-button-spacing {
                    margin-top: 1rem;
                }

                .button-spacing > * + * {
                    margin-left: 0.5rem;
                }

                .whitespace-pre-line {
                    white-space: pre-line;
                }
            `}</style>
        </div>
    );
};

export default PostsPage;
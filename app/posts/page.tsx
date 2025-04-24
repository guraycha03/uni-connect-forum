// app/posts/page.tsx   ← List of posts



'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simplified Card components to avoid the missing module error.
const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
        {children}
    </div>
);

const CardHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
        {children}
    </div>
);

const CardTitle = ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
        {children}
    </h3>
);

const CardDescription = ({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={`text-sm text-muted-foreground ${className}`} {...props}>
        {children}
    </p>
);

const CardContent = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`p-6 pt-0 ${className}`} {...props}>
        {children}
    </div>
);

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

const PostsPage = () => {
    const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
    const [posts, setPosts] = useState<Post[]>([
        {
            id: 1,
            author: 'Prof. Marie Gonzales',
            role: 'moderator',
            title: '🎉 Welcome to UniConnect Forum! 🎓',
            content: 'This platform is created to empower every student and faculty member to share knowledge, updates, and insights. Let’s keep the discussions respectful and helpful!',
            comments: [
                { user: 'Jonathan', comment: 'This is awesome! Thank you for this initiative.' },
                { user: 'Irene', comment: 'Looking forward to productive discussions!' },
            ],
            isPinned: true, // Pinned post
            image: 'https://source.unsplash.com/random/800x400/?university,campus,1',
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
        // Other posts...
    ]);

    const toggleExpand = (id: number) => {
        setExpandedPostId((prev) => (prev === id ? null : id));
    };

    const handleLike = (postId: number) => {
        setPosts(
            posts.map((p) =>
                p.id === postId ? { ...p, likes: (p.likes || 0) + 1 } : p
            )
        );
    };

    const handleShare = (postId: number) => {
        alert(`Shared post ${postId}! (This is a placeholder)`);
    };

    const handlePin = (postId: number) => {
        setPosts(prevPosts => {
            const postToPin = prevPosts.find(p => p.id === postId);
            if (!postToPin) return prevPosts;

            const updatedPosts = prevPosts.map(p =>
                p.id === postId ? { ...p, isPinned: !p.isPinned } : p
            );

            const sortedPosts = [...updatedPosts].sort((a, b) => {
                if (a.isPinned && !b.isPinned) return -1;
                if (!a.isPinned && b.isPinned) return 1;
                return a.id - b.id; 
            });
            return sortedPosts;
        });
    };

    const sortedPosts = [...posts].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return a.id - b.id;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#fff4f4] to-[#ffecec] py-10 px-6">
            <h1 className="text-4xl font-bold text-maroon-800 mb-8 text-center drop-shadow-md">
                📬 Forum Posts & Announcements
            </h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                <AnimatePresence>
                    {sortedPosts.map((post) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-maroon-100"
                        >
                            <Card className="border-none bg-transparent">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-xl font-semibold text-maroon-900 cursor-pointer" onClick={() => toggleExpand(post.id)}>
                                            {post.title}
                                        </CardTitle>
                                        {post.isPinned && (
                                            <div className="bg-yellow-500/20 text-yellow-300 rounded-full px-2 py-1 flex items-center gap-1">
                                                <span className="w-4 h-4">📌</span> Pinned
                                            </div>
                                        )}
                                        {post.role === 'moderator' && (
                                            <button
                                                onClick={() => handlePin(post.id)}
                                                className="ml-2 rounded-full p-2 text-yellow-700 hover:text-yellow-900 hover:bg-yellow-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                title={post.isPinned ? "Unpin Post" : "Pin Post"}
                                            >
                                                <span className="w-4 h-4">📌</span>
                                            </button>
                                        )}
                                    </div>
                                    <CardDescription className="text-sm text-gray-500 italic">
                                        Posted by: {post.author} ({post.role})
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
                                    {post.image && (
                                        <div className="mt-4">
                                            <img
                                                src={post.image}
                                                alt={`Image for ${post.title}`}
                                                className="rounded-lg w-full h-auto max-h-64 object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => handleLike(post.id)}
                                                className="rounded-full p-2 text-red-500 hover:bg-red-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                ❤️
                                            </button>
                                            <span className="text-sm text-gray-500">{post.likes || 0}</span>
                                            <button
                                                onClick={() => handleShare(post.id)}
                                                className="rounded-full p-2 text-blue-500 hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                🔗
                                            </button>
                                        </div>
                                    </div>
                                    <AnimatePresence>
                                        {expandedPostId === post.id && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="mt-4"
                                            >
                                                <div className="text-lg font-medium text-gray-800">Comments</div>
                                                {post.comments.map((comment, index) => (
                                                    <div key={index} className="mt-2 p-2 bg-gray-100 rounded-md">
                                                        <strong>{comment.user}</strong>: {comment.comment}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PostsPage;

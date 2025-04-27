// app/posts/page.tsx   ← List of posts



'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, Pin, MessageCircle, PlusCircle, XCircle } from 'lucide-react'; // Using lucide-react for icons
// import { Button } from '@/components/ui/button'; // Assuming you have a Button component  -- REMOVED
// import { Input } from '@/components/ui/input'; // Assuming you have an Input component    -- REMOVED
// import { Textarea } from '@/components/ui/textarea'; // Assuming you have a Textarea component  -- REMOVED
// import { Label } from '@/components/ui/label'; // Assuming you have a Label component    -- REMOVED

// ===============================
// Component: Card (Simplified)
// ===============================
const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`rounded-xl border border-gray-200 bg-white shadow-md ${className}`} {...props}>
        {children}
    </div>
);

// ===============================
// Component: CardHeader (Simplified)
// ===============================
const CardHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${className}`} {...props}>
        {children}
    </div>
);

// ===============================
// Component: CardTitle (Simplified)
// ===============================
const CardTitle = ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={`text-xl font-semibold text-gray-900 ${className}`} {...props}>
        {children}
    </h3>
);

// ===============================
// Component: CardDescription (Simplified)
// ===============================
const CardDescription = ({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={`text-sm text-gray-500 ${className}`} {...props}>
        {children}
    </p>
);

// ===============================
// Component: CardContent (Simplified)
// ===============================
const CardContent = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`p-4 pt-0 ${className}`} {...props}>
        {children}
    </div>
);

// ===============================
// Interface: Comment
// ===============================
interface Comment {
    user: string;
    comment: string;
}

// ===============================
// Interface: Post
// ===============================
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

// ===============================
// Component: PostsPage
// ===============================
const PostsPage = ({ onPostAdded }: { onPostAdded?: (newPost: Post) => void }) => { // Make onPostAdded optional
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
        // More posts...
        {
            id: 3,
            author: "Student 1",
            role: "student",
            title: "Question about Midterm Exam",
            content: "Hi everyone, I have a question about the upcoming midterm exam.  Does anyone know what chapters will be covered?  Also, is there a study group I can join?",
            comments: [
                { user: "Student 2", comment: "I heard chapters 3-5 will be on the exam." },
                { user: "Student 3", comment: "There's a study group meeting on Friday in the library!" },
            ],
            likes: 7,
        },
        {
            id: 4,
            author: "Professor Smith",
            role: "moderator",
            title: "Office Hours Announcement",
            content: "My office hours for this week will be on Tuesday and Thursday from 2-4 PM.  Please come by if you have any questions about the course material.",
            comments: [],
            isPinned: true,
            likes: 12,
        },
        {
            id: 5,
            author: "Club President",
            role: "student",
            title: "Volunteer Opportunity",
            content: "The Environmental Club is looking for volunteers for our upcoming tree planting event.  It will be on Saturday from 9 AM to 12 PM.  Lunch will be provided!",
            comments: [
                { user: "Student 4", comment: "I'd love to volunteer!  Where is the meeting location?" },
            ],
            image: "https://source.unsplash.com/random/800x400/?tree,planting,volunteer",
            likes: 20,
        },
    ]);
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [newPost, setNewPost] = useState<Omit<Post, 'id' | 'comments' | 'likes' | 'author' | 'role'>>({
        title: '',
        content: '',
        image: undefined, // Or null, depending on your needs
    });

    // Function to handle adding a new post
    const handleAddPost = () => {
        if (newPost.title.trim() && newPost.content.trim()) {
            const latestPost: Post = {
                id: Math.max(0, ...posts.map(p => p.id)) + 1, // Simple ID generation
                author: 'Current User', //  Get the current user
                role: 'student',       //  Get the current user role
                comments: [],
                likes: 0,
                ...newPost,
            };
            setPosts(prevPosts => [latestPost, ...prevPosts]);
            onPostAdded?.(latestPost); // Notify the parent component, if provided.  The fix is here.
            setIsCreatingPost(false); // Close the form
            setNewPost({ title: '', content: '', image: undefined }); // Reset form
        } else {
            alert('Please fill in both title and content!'); // Basic validation
        }
    };

    // ===============================
    // Function: toggleExpand
    // ===============================
    const toggleExpand = (id: number) => {
        setExpandedPostId((prev) => (prev === id ? null : id));
    };

    // ===============================
    // Function: handleLike
    // ===============================
    const handleLike = (postId: number) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
            )
        );
    };

    // ===============================
    // Function: handleShare
    // ===============================
    const handleShare = (postId: number) => {
        // Replace with actual sharing logic (e.g., using the Web Share API)
        alert(`Shared post ${postId}! (This is a placeholder for sharing functionality)`);
    };

    // ===============================
    // Function: handlePin
    // ===============================
    const handlePin = (postId: number) => {
        setPosts(prevPosts => {
            const postToPin = prevPosts.find(p => p.id === postId);
            if (!postToPin) return prevPosts;

            const updatedPosts = prevPosts.map(p =>
                p.id === postId ? { ...p, isPinned: !p.isPinned } : p
            );

            // Sort posts: Pinned posts first, then by ID (or date, if you have it)
            const sortedPosts = [...updatedPosts].sort((a, b) => {
                if (a.isPinned && !b.isPinned) return -1;
                if (!a.isPinned && b.isPinned) return 1;
                return a.id - b.id; // Or use a date field if available
            });
            return sortedPosts;
        });
    };

    // ===============================
    // Variable: sortedPosts
    // ===============================
    // Sort posts: Pinned posts at the top, then by ID (or date)
    const sortedPosts = [...posts].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return a.id - b.id; // Or use a date field for chronological order
    });

    // ===============================
    // Render: PostsPage
    // ===============================
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center bg-gradient-to-r from-maroon-700 to-maroon-900 text-transparent bg-clip-text drop-shadow-md">
                    📬 Forum Posts & Announcements
                </h1>

                <button  // Replaced Button
                    onClick={() => setIsCreatingPost(!isCreatingPost)}
                    className="mb-6 bg-maroon-500 hover:bg-maroon-700 text-white font-semibold rounded-md px-4 py-2 flex items-center gap-2"
                >
                    {isCreatingPost ? (
                        <>
                            <XCircle className="w-5 h-5" />
                            Cancel
                        </>
                    ) : (
                        <>
                            <PlusCircle className="w-5 h-5" />
                            Create Post
                        </>
                    )}
                </button>

                <AnimatePresence>
                    {isCreatingPost && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="mb-6"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Create New Post</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label  // Replaced Label
                                            htmlFor="post-title"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Title
                                        </label>
                                        <input // Replaced Input
                                            id="post-title"
                                            value={newPost.title}
                                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                            placeholder="Enter post title"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon-500 focus:border-maroon-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label  // Replaced Label
                                            htmlFor="post-content"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Content
                                        </label>
                                        <textarea // Replaced Textarea
                                            id="post-content"
                                            value={newPost.content}
                                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                            placeholder="Enter post content"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon-500 focus:border-maroon-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label  // Replaced Label
                                            htmlFor="post-image"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Image URL (Optional)
                                        </label>
                                        <input // Replaced Input
                                            id="post-image"
                                            type="url"
                                            value={newPost.image || ''}
                                            onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                                            placeholder="Enter image URL"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon-500 focus:border-maroon-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button  // Replaced Button
                                            onClick={handleAddPost}
                                            className="bg-maroon-500 hover:bg-maroon-700 text-white font-semibold rounded-md px-4 py-2"
                                        >
                                            Post
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="space-y-6">
                    <AnimatePresence>
                        {sortedPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 p-4">
                                    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative">
                                        <CardTitle className="cursor-pointer hover:text-maroon-700 transition-colors flex-grow" onClick={() => toggleExpand(post.id)}>
                                            {post.title}
                                        </CardTitle>
                                        <div className="flex items-center gap-2 flex-wrap justify-end">
                                            {post.isPinned && (
                                                <div className="bg-yellow-100 text-yellow-700 rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1">
                                                    <Pin className="w-3 h-3" />
                                                    Pinned
                                                </div>
                                            )}
                                            {post.role === 'moderator' && (
                                                <button
                                                    onClick={() => handlePin(post.id)}
                                                    className="rounded-full p-2 text-yellow-700 hover:text-yellow-900 hover:bg-yellow-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 absolute top-0 right-0 mt-4 mr-4" // Adjusted position
                                                    title={post.isPinned ? "Unpin Post" : "Pin Post"}
                                                >
                                                    <Pin className="w-4 h-4" />
                                                </button>
                                            )}
                                            <span className='text-gray-600 text-sm italic'>{post.author} ({post.role})</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {post.image && (
                                            <div className="mb-4">
                                                <img
                                                    src={post.image}
                                                    alt={`Image for ${post.title}`}
                                                    className="rounded-lg w-full h-auto max-h-64 object-cover"
                                                />
                                            </div>
                                        )}
                                        <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>

                                        <div className="flex justify-between items-center mt-4">
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => handleLike(post.id)}
                                                    className="rounded-full p-2 text-red-500 hover:bg-red-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center gap-1"
                                                >
                                                    <Heart className="w-4 h-4" />
                                                    <span>{post.likes || 0}</span>
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => handleShare(post.id)}
                                                    className="rounded-full p-2 text-blue-500 hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <Share2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <AnimatePresence>
                                            {expandedPostId === post.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="mt-4 overflow-hidden"
                                                >
                                                    <div className="text-lg font-medium text-gray-800 mb-2 flex items-center gap-2">
                                                        <MessageCircle className='w-5 h-5' /> Comments
                                                    </div>
                                                    {post.comments.map((comment, index) => (
                                                        <div key={index} className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                            <p><span className="font-semibold text-gray-700">{comment.user}: </span><span className='text-gray-600'>{comment.comment}</span></p>
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
        </div>
    );
};

export default PostsPage;



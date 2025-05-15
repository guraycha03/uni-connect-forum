// app/posts/page.tsx   ← List of posts & Dashboard



'use client' // Add this line at the top

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';
import { cn } from '@/lib/utils';
import { User, Users, FileText, MessageCircle, BarChart as ChartIcon, PlusCircle, Trash2, Edit, Send, ImagePlus } from 'lucide-react';
//import { Textarea } from "@/components/ui/textarea" // REMOVE THIS LINE
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data (Replace with actual data fetching)
const initialUsersData = 20; // Fixed number of users

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
    comments: Comment[];
    imageUrl?: string; // Optional image URL
}

interface Comment {
    id: number;
    author: string;
    text: string;
    date: string;
}

const generateMockCommentData = (count: number) => {
    const comments: Comment[] = [];
    const studentNames = [
        "Miguel Torres", "Angelica Cruz", "Daniel Navarro", "Mark Yu",
        "Janine Dela Cruz", "Kevin Bautista", "Ella Manalo", "Andrew Salazar",
        "Patricia Villanueva", "Justin Reyes", "Luisa Mendoza", "Ronald De La Cruz",
        "Sophia Soriano", "Joseph Galang", "Bea Quijano", "Ryan Lopez",
        "Katrina Valdez", "Enzo Ramos", "Charmaine Garcia", "Daryl Morales"
    ];
    for (let i = 1; i <= count; i++) {
        comments.push({
            id: i,
            author: studentNames[Math.floor(Math.random() * studentNames.length)],
            text: `This is a thoughtful comment on this announcement.  I have something to say.`, // More realistic
            date: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 14).toISOString(), // Random date within last 2 weeks
        });
    }
    return comments;
};

// Define initialCommentsData
const initialCommentsData: Comment[] = generateMockCommentData(5); // Initialize with some data


const chartColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Animation Variants
const postVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } }
};

const commentVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 10, transition: { duration: 0.2 } }
};

// ApexCharts component (using recharts instead)
const ChartPanel = () => {
    const [chartData, setChartData] = useState({
        users: initialUsersData, // Fixed user count
        posts: 0,
        comments: initialCommentsData.length,
    });

    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Comment[]>(initialCommentsData); // Use the defined initialCommentsData
    const [newPostContent, setNewPostContent] = useState('');
    const [editingPostId, setEditingPostId] = useState<number | null>(null);
    const [editedPostContent, setEditedPostContent] = useState('');
    const [commentText, setCommentText] = useState('');
    const [expandedPostId, setExpandedPostId] = useState<number | null>(null); // Track expanded post
    const [newPostImage, setNewPostImage] = useState<string | undefined>(); // State for new post image

    // Load posts from local storage on component mount
    useEffect(() => {
        const storedPosts = localStorage.getItem('unicConnectPosts');
        if (storedPosts) {
            try {
                const parsedPosts = JSON.parse(storedPosts);
                setPosts(parsedPosts);
                updateChartData(parsedPosts, comments); //update initial chart
            } catch (error) {
                console.error("Failed to parse stored posts:", error);
                // Handle error, e.g., clear corrupted data
                localStorage.removeItem('unicConnectPosts');
                setPosts([]);
                updateChartData([], comments);
            }
        } else {
            // If no posts in local storage, initialize with default post
            const initialPost = {
                id: 1,
                title: "Welcome to UniConnect!",
                content: `Welcome to UniConnect, your central hub for university life!  This is where you can connect with other students, faculty, and organizations.  Feel free to browse the announcements, participate in discussions, and share your thoughts.  We're excited to have you here!`,
                author: `Professor Johnson`,
                date: new Date().toISOString(),
                comments: [
                    { id: 1, author: 'Miguel Torres', text: 'Welcome to the community!  I look forward to connecting with everyone.', date: new Date().toISOString() },
                    { id: 2, author: 'Angelica Cruz', text: 'Great to be here!  Are there any clubs or organizations I should check out?', date: new Date().toISOString() },
                ]
            };
            setPosts([initialPost]);
            localStorage.setItem('unicConnectPosts', JSON.stringify([initialPost]));
            updateChartData([initialPost], comments);
        }
    }, []);

    // Save posts to local storage whenever they change
    useEffect(() => {
        if (posts.length > 0) {
            localStorage.setItem('unicConnectPosts', JSON.stringify(posts));
        }
    }, [posts]);


    // Simulate fetching new data and updating state
    const handleAddPost = () => {
        if (newPostContent.trim()) {
            const newPost: Post = {
                id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
                title: `Announcement ${posts.length + 1}`, // Keep it as announcement
                content: newPostContent,
                author: `User ${Math.floor(Math.random() * initialUsersData) + 1}`, //  more realistic
                date: new Date().toISOString(),
                comments: [], // Initialize with empty comments array
                imageUrl: newPostImage, // Include image URL
            };
            const updatedPosts = [...posts, newPost];
            setPosts(updatedPosts);
            setNewPostContent(''); // Clear input
            setNewPostImage(undefined); // Clear image
            updateChartData(updatedPosts, [...comments]); // Pass updated posts and comments.  Important:  Pass a COPY
        }
    };

    const handleEditPost = (postId: number, currentContent: string) => {
        setEditingPostId(postId);
        setEditedPostContent(currentContent); // Initialize edit form with current content
    };

    const handleSaveEdit = (postId: number) => {
        const updatedPosts = posts.map(p =>
            p.id === postId ? { ...p, content: editedPostContent, date: new Date().toISOString() } : p
        );
        setPosts(updatedPosts);
        setEditingPostId(null); // Exit edit mode
        setEditedPostContent('');
        updateChartData(updatedPosts, comments);
    };

    const handleDeletePost = (postId: number) => {
        const updatedPosts = posts.filter(p => p.id !== postId);
        setPosts(updatedPosts);
        updateChartData(updatedPosts, comments);
        setExpandedPostId(null); // Collapse post if it was expanded
    };

    const handleAddComment = (postId: number) => {
        if (commentText.trim()) {
            const newComment: Comment = {
                id: comments.length + 1,
                author: ["Miguel Torres", "Angelica Cruz", "Daniel Navarro", "Mark Yu",
                    "Janine Dela Cruz", "Kevin Bautista", "Ella Manalo", "Andrew Salazar",
                    "Patricia Villanueva", "Justin Reyes", "Luisa Mendoza", "Ronald De La Cruz",
                    "Sophia Soriano", "Joseph Galang", "Bea Quijano", "Ryan Lopez",
                    "Katrina Valdez", "Enzo Ramos", "Charmaine Garcia", "Daryl Morales"][Math.floor(Math.random() * 20)], //  more realistic
                text: commentText,
                date: new Date().toISOString(),
            };

            // Find the post and add the comment
            const updatedPosts = posts.map(p => {
                if (p.id === postId) {
                    return { ...p, comments: [...p.comments, newComment] };
                }
                return p;
            });

            setPosts(updatedPosts);
            setComments(prevComments => [...prevComments, newComment]);
            setCommentText(''); // Clear comment input
            updateChartData(updatedPosts, [...comments, newComment]); // Update with combined comments
        }
    };

    // Helper function to update chart data
    const updateChartData = (updatedPosts: Post[], updatedComments: Comment[]) => {
        const totalComments = updatedPosts.reduce((acc, post) => acc + post.comments.length, 0);

        setChartData(prevData => ({
            users: initialUsersData, // Keep user count fixed
            posts: updatedPosts.length,
            comments: totalComments,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewPostImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };


    useEffect(() => {
        // Initial chart data setup
        updateChartData(posts, comments);
    }, [posts, comments]);

    const pieChartData = [
        { name: 'Users', value: chartData.users },
        { name: 'Posts', value: chartData.posts },
        { name: 'Comments', value: chartData.comments },
    ];

    const barChartData = [
        {
            name: 'Data',
            Users: chartData.users,
            Posts: chartData.posts,
            Comments: chartData.comments
        }
    ];

    return (
        <div className="container mx-auto p-4">
            {/* Removed the duplicate heading here */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-4 pl-4"> {/* Added padding-left here */}
                        <Users className="w-6 h-6 text-blue-500" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Total Students</h3>
                            <p className="text-xl text-gray-900">{chartData.users}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 pl-4"> {/* Added padding-left here */}
                        <FileText className="w-6 h-6 text-green-500" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Total Posts</h3>
                            <p className="text-xl text-gray-900">{chartData.posts}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 pl-4"> {/* Added padding-left here */}
                        <MessageCircle className="w-6 h-6 text-purple-500" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Total Comments</h3>
                            <p className="text-xl text-gray-900">{chartData.comments}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="shadow-lg border-0 col-span-full md:col-span-2 transition-transform hover:scale-[1.02] duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ChartIcon className="w-5 h-5 text-orange-500" />
                            Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart
                                data={barChartData}
                                margin={{ left: 20, right: 20, top: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}
                                    labelStyle={{ fontWeight: 'bold', color: '#333' }}
                                    itemStyle={{ color: '#555' }}
                                />
                                <Legend wrapperStyle={{ fontFamily: 'Inter, sans-serif' }} />
                                <Bar dataKey="Users" fill={chartColors[0]}
                                     activeDot={{ r: 8 }}
                                     label={{
                                         position: 'top',
                                         fill: chartColors[0],
                                         fontSize: 14,
                                         fontFamily: 'Inter, sans-serif'
                                     }}
                                />
                                <Bar dataKey="Posts" fill={chartColors[1]}
                                     activeDot={{ r: 8 }}
                                     label={{
                                         position: 'top',
                                         fill: chartColors[1],
                                         fontSize: 14,
                                         fontFamily: 'Inter, sans-serif'
                                     }}
                                />
                                <Bar dataKey="Comments" fill={chartColors[2]}
                                     activeDot={{ r: 8 }}
                                     label={{
                                         position: 'top',
                                         fill: chartColors[2],
                                         fontSize: 14,
                                         fontFamily: 'Inter, sans-serif'
                                     }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="shadow-lg border-0 col-span-full md:col-span-1 transition-transform hover:scale-[1.02] duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ChartIcon className="w-5 h-5 text-pink-500" />
                            Data Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <ResponsiveContainer width="100%" height={350}>
                            <PieChart margin={{ left: 20, right: 20, top: 20, bottom: 5 }}>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({
                                        cx,
                                        cy,
                                        midAngle,
                                        innerRadius,
                                        outerRadius,
                                    }) => {
                                        const RADIAN = Math.PI / 180;
                                        const radius = 25 + innerRadius + (outerRadius - innerRadius);
                                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                        const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                        return null; // Remove label
                                    }}
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}
                                    itemStyle={{ color: '#555' }}
                                    labelStyle={{ fontWeight: 'bold', color: '#333' }}
                                />
                                <Legend wrapperStyle={{ fontFamily: 'Inter, sans-serif' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>


                {/* Display Posts (Announcements) */}
                <Card className="shadow-lg border-0 col-span-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-500" />
                            Announcements
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <AnimatePresence>
                            {posts.map((post) => (
                                <motion.div
                                    key={post.id.toString()}
                                    variants={postVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="p-6 border rounded-lg bg-gray-50 relative group
                                            transition-shadow duration-300 hover:shadow-md"
                                >
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                                    <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        <span>{post.author}</span>
                                        <span className="text-gray-500">on</span>
                                        <span>{new Date(post.date).toLocaleString()}</span>
                                    </p>
                                    {post.imageUrl && (
                                        <div className="mb-4">
                                            <img
                                                src={post.imageUrl}
                                                alt={`Announcement ${post.id}`}
                                                className="rounded-md w-full h-auto max-h-[150px] object-cover" // Reduced max-height
                                            />
                                        </div>
                                    )}
                                    <p
                                        className={cn(
                                            "text-gray-700 whitespace-pre-line mt-2 transition-max-h duration-300 overflow-hidden",
                                            expandedPostId === post.id ? "max-h-[1000px]" : "max-h-40"
                                        )}
                                    >
                                        {post.content}
                                    </p>
                                    {/* Expand/Collapse Button */}
                                    <Button
                                        variant="link"
                                        className="text-blue-500 p-0 mt-2 hover:underline"
                                        onClick={() => setExpandedPostId(prevId => prevId === post.id ? null : post.id)}
                                    >
                                        {expandedPostId === post.id ? "Show Less" : "Show More"}
                                    </Button>

                                    <div className="flex flex-wrap gap-4 mt-6 justify-end">
                                        <Badge variant="outline" className="px-3 py-1.5 flex items-center gap-1.5">
                                            <MessageCircle className="w-4 h-4" />
                                            <span>{post.comments.length} Comments</span>
                                        </Badge>
                                        {editingPostId === post.id ? (
                                            <>
                                                <textarea
                                                    value={editedPostContent}
                                                    onChange={(e) => setEditedPostContent(e.target.value)}
                                                    className="flex-1 border rounded-md p-3 text-gray-800 min-w-[200px] order-first"
                                                    rows={3}
                                                    placeholder="Edit your announcement..."
                                                />
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleSaveEdit(post.id)}
                                                    disabled={!editedPostContent.trim()}
                                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md"
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => setEditingPostId(null)}
                                                    className="text-gray-700 hover:bg-gray-100 font-medium px-3 py-1.5 rounded-md"
                                                >
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleEditPost(post.id, post.content)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
                                                >
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDeletePost(post.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </Button>
                                            </>
                                        )}
                                    </div>

                                    {/* Comments Section */}
                                    <div className="mt-8">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Comments</h4>
                                        <AnimatePresence>
                                            {post.comments.map((comment) => (
                                                <motion.div
                                                    key={comment.id.toString()}
                                                    variants={commentVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    className="p-4 border-l-4 border-gray-300 pl-4 mb-4 bg-gray-100 rounded-md
                                                                    transition-all duration-200 hover:bg-gray-50 flex items-start gap-4"
                                                >
                                                    <div className='flex-1'>
                                                        <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                                                            <User className="w-4 h-4 inline-block" />
                                                            <span>{comment.author}</span>
                                                            <span className="text-gray-500">on</span>
                                                            <span>{new Date(comment.date).toLocaleString()}</span>
                                                        </p>
                                                        <p className="text-gray-800 leading-relaxed">{comment.text}</p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                        {/* Comment Input */}
                                        <div className="flex gap-4 mt-6">
                                            <textarea
                                                placeholder="Add a comment..."
                                                value={commentText}
                                                onChange={(e) => setCommentText(e.target.value)}
                                                className="flex-1 border rounded-md p-3 text-gray-800"
                                                rows={2}
                                            />
                                            <Button
                                                size="sm"
                                                onClick={() => handleAddComment(post.id)}
                                                disabled={!commentText.trim()}
                                                className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md"
                                            >
                                                <Send className="mr-2 h-4 w-4" />
                                                Post
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {/* New Post Input */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Create New Announcement</h4>
                            <div className="flex flex-col gap-4">
                                <textarea
                                    placeholder="Write your announcement here..."
                                    value={newPostContent}
                                    onChange={(e) => setNewPostContent(e.target.value)}
                                    className="border rounded-md p-3 text-gray-800"
                                    rows={3}
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mb-4"
                                />
                                {newPostImage && (
                                    <div className="mb-4">
                                        <img
                                            src={newPostImage}
                                            alt="Preview"className="rounded-md w-full max-h-[150px] object-cover"
                                        />
                                    </div>
                                )}
                                <Button
                                    size="sm"
                                    onClick={handleAddPost}
                                    disabled={!newPostContent.trim()}
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md w-fit"
                                >
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Publish
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

// Main Page Component
const PostsPage = () => {
    return (
        <div className="container mx-auto p-4">
            {/* Removed the duplicate heading here */}
            <ChartPanel />
        </div>
    );
};

export default PostsPage;



//   ← Post details with comments

//   ← Post details with comments


'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from 'lucide-react';

interface Post {
    id: number;
    title: string;
    body: string;
}

interface Comment {
    id: number;
    name: string;
    email: string;
    body: string;
}

const PostDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isDeleting, setIsDeleting] = useState(false); // Track deletion state

    useEffect(() => {
        if (!id) return;

        const fetchPost = async () => {
            try {
                const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
                setPost(res.data);
            } catch (error) {
                console.error("Error fetching post:", error);
                // Consider showing a user-friendly error message
                setPost(null); // Set post to null to prevent further errors
            }
        };

        const fetchComments = async () => {
            try {
                const res = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
                setComments(res.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
                // Optionally handle comment fetch error
                setComments([]);
            }
        };

        fetchPost();
        fetchComments();
    }, [id]);

    const handleDeletePost = async () => {
        if (!post) return;

        setIsDeleting(true); // Set deleting to true to show loading state

        try {
            // Delete the post
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
            // Redirect to the home page or posts page after successful deletion
            router.push('/');
        } catch (error) {
            console.error("Error deleting post:", error);
            // Handle error, show message to user (optional)
        } finally {
            setIsDeleting(false); // Set deleting back to false
        }
    };

    if (!post) return <div>Loading post...</div>;

    return (
        <div className="p-4">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                    <p className="mt-2 mb-6 text-gray-700">{post.body}</p>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="destructive"
                            className="text-red-500 hover:text-red-700"
                            disabled={isDeleting}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this post
                                and all its comments from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDeletePost}
                                disabled={isDeleting} // Disable during deletion
                                className={isDeleting ? "opacity-70 cursor-not-allowed" : ""} // Style during deletion
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            <h2 className="text-xl font-semibold mb-2">Comments</h2>
            <ul className="space-y-4">
                {comments.map(comment => (
                    <li key={comment.id} className="p-4 border rounded bg-gray-50">
                        <p className="text-sm font-medium">{comment.name} <span className="text-xs text-gray-500">({comment.email})</span></p>
                        <p className="text-sm">{comment.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostDetailPage;


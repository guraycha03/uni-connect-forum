//   ← Post details with comments


'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

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

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (!id) return;

    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(console.error);

    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      .then(res => setComments(res.data))
      .catch(console.error);
  }, [id]);

  if (!post) return <div>Loading post...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-2 mb-6 text-gray-700">{post.body}</p>

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
}

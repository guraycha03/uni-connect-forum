// app/posts/page.tsx   ← List of posts


'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => setPosts(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.id} className="p-4 border rounded hover:bg-gray-100">
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-lg font-semibold cursor-pointer">{post.title}</h2>
            </Link>
            <p className="text-sm text-gray-600">{post.body.slice(0, 80)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

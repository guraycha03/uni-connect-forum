
// app/users/[id]/page.tsx


// app/users/[id]/page.tsx

import { fetchUser, fetchUserPosts } from '@/utils/api';
import Map from '@/components/Map';

interface Params {
  params: { id: string };
}

export default async function UserProfilePage({ params }: Params) {
  const userId = params.id;
  const user = await fetchUser(userId);
  const posts = await fetchUserPosts(userId);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{user.name} (@{user.username})</h1>
      <p className="mb-4 text-gray-600">{user.email}</p>

      {/* 📍 Map Section */}
      <div className="mb-6 h-64">
        <Map lat={parseFloat(user.address.geo.lat)} lng={parseFloat(user.address.geo.lng)} />
      </div>

      {/* 📬 Posts */}
      <h2 className="text-xl font-semibold mb-2">Posts by {user.name}</h2>
      <ul className="space-y-4">
        {posts.map((post: any) => (
          <li key={post.id} className="p-4 border rounded">
            <h3 className="text-lg font-medium">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

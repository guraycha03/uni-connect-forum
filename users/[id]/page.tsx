// 'use client';
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';
// import Map from '@/components/Map'; // assuming your Mapbox component is ready

// interface User {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
//   address: {
//     street: string;
//     city: string;
//     geo: {
//       lat: string;
//       lng: string;
//     };
//   };
// }

// interface Post {
//   id: number;
//   title: string;
//   body: string;
// }

// export default function UserProfilePage() {
//   const { id } = useParams();
//   const [user, setUser] = useState<User | null>(null);
//   const [posts, setPosts] = useState<Post[]>([]);

//   useEffect(() => {
//     if (!id) return;

//     axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
//       .then(res => setUser(res.data))
//       .catch(console.error);

//     axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
//       .then(res => setPosts(res.data))
//       .catch(console.error);
//   }, [id]);

//   if (!user) return <div>Loading user data...</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">{user.name}'s Profile</h1>
//       <p className="text-gray-600">@{user.username}</p>
//       <p className="text-sm text-gray-500">{user.email}</p>
//       <p className="mt-2">{user.address.street}, {user.address.city}</p>

//       {/* Map */}
//       <div className="my-4 h-[300px]">
//         <Map lat={parseFloat(user.address.geo.lat)} lng={parseFloat(user.address.geo.lng)} />
//       </div>

//       {/* Posts */}
//       <h2 className="text-xl font-semibold mt-6 mb-3">Posts by {user.name}</h2>
//       <ul className="space-y-4">
//         {posts.map(post => (
//           <li key={post.id} className="p-4 border rounded">
//             <h3 className="font-medium">{post.title}</h3>
//             <p className="text-sm">{post.body}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

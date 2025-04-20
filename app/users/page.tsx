// app/users/page.tsx
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <ul className="space-y-4">
        {users.map(user => (
          <li key={user.id} className="p-4 border rounded hover:bg-gray-100 cursor-pointer">
            <p className="text-lg font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

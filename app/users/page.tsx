// app/users/page.tsx
//USERS LIST PAGE


'use client';
import { useEffect, useState } from 'react';
import { fetchUsers } from '@/utils/api';
import Link from 'next/link';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <ul className="space-y-4">
        {users.map(user => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
              <div className="p-4 border rounded hover:bg-gray-100 cursor-pointer">
                <p className="text-lg font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

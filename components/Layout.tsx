///components/Layout.tsx


'use client';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow px-6 py-4 mb-6">
        <nav className="flex space-x-6">
          <Link href="/dashboard" className="font-medium hover:text-blue-600">Dashboard</Link>
          <Link href="/users" className="font-medium hover:text-blue-600">Users</Link>
          <Link href="/posts" className="font-medium hover:text-blue-600">Posts</Link>
        </nav>
      </header>
      <main className="px-6">{children}</main>
    </div>
  );
}

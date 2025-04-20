// app/students/page.tsx


'use client';

import Link from 'next/link';

export default function StudentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Students List</h1>

      <div className="space-y-4">
        <Link href="/students/cha">
          <div className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer">
            <h2 className="font-semibold text-lg">Cha Guray</h2>
            <p>Email: cha@guray.com</p>
            <p>Status: Enrolled</p>
          </div>
        </Link>

        <Link href="/students/sora">
          <div className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer">
            <h2 className="font-semibold text-lg">Jin Sora</h2>
            <p>Email: sora@kdramail.com</p>
            <p>Status: Graduated</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

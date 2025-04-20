

// app/page.tsx
// app/page.tsx
'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <main className="flex-grow px-6 py-10 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-[#800000]">Welcome to the Project Dashboard</h2>

        <nav className="flex gap-6 text-sm font-medium mb-8 text-[#800000]">
          <Link href="/students" className="hover:underline">Students</Link>
          <Link href="/projects" className="hover:underline">Projects</Link>
          <Link href="/reports" className="hover:underline">Reports</Link>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-[#800000]/20 p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-[#800000]">👥 Total Students</h3>
            <p className="text-2xl font-bold text-[#800000]">12</p>
          </div>

          <div className="bg-white border border-[#800000]/20 p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-[#800000]">📁 Active Projects</h3>
            <p className="text-2xl font-bold text-[#800000]">5</p>
          </div>

          <div className="bg-white border border-[#800000]/20 p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-[#800000]">📄 Reports Submitted</h3>
            <p className="text-2xl font-bold text-[#800000]">18</p>
          </div>
        </div>
      </main>
    </div>
  );
}

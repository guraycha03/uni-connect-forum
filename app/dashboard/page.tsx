import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project Dashboard</h1>

      {/* This is the clickable box to go to Students */}
      <Link href="/students">
        <div className="p-4 bg-white shadow rounded hover:bg-gray-100 cursor-pointer transition">
          📚 View Student Profiles
        </div>
      </Link>
    </div>
  );
}

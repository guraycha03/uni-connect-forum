//   Data Visualization using ApexCharts 
//  app/dashboard/page.tsx

'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useStudentStore } from '@/store/studentStore'; // Import the store

// Use a dynamic import to handle client-side rendering for ApexCharts
const DashboardChart = dynamic(() => import('@/components/DashboardChart'), {
  ssr: false, // Ensure the component is only rendered on the client-side
});

const DashboardPage = () => {
  const students = useStudentStore((state) => state.students);
  const [initialPosts] = useState(5);
  const [initialComments] = useState(6);

  return (
    <main className="p-6 bg-maroon-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-maroon-900">🎓 Dashboard</h1>

      <section className="bg-white rounded-lg shadow-md p-6 min-h-[500px]" aria-labelledby="campus-stats">
        <h2 id="campus-stats" className="text-2xl font-semibold mb-4 text-maroon-800">
          📊 Live Campus Statistics
        </h2>

        <DashboardChart
          students={students} // Use the students from the store
          initialPosts={initialPosts}
          initialComments={initialComments}
        />

        <ul className="mt-6 space-y-2 text-gray-700 text-lg">
          <li><strong>Total Students:</strong> {students.length}</li>
          <li><strong>Total Posts:</strong> {initialPosts}</li>
          <li><strong>Total Comments:</strong> {initialComments}</li>
        </ul>
      </section>
    </main>
  );
};

export default DashboardPage;
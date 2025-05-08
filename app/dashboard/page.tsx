//   Data Visualization using ApexCharts 
//  app/dashboard/page.tsx


// app/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Use a dynamic import to handle client-side rendering for ApexCharts
const DashboardChart = dynamic(() => import('@/components/DashboardChart'), {
    ssr: false, // Ensure the component is only rendered on the client-side
});

interface Student {
    id: number;
    name: string;
    course: string;
    year: string;
}

const studentsData: Student[] = [
    { id: 1, name: 'Alice Santiago', course: 'BSIT', year: '1st Year' },
    { id: 2, name: 'Brian Cruz', course: 'BSCS', year: '2nd Year' },
    { id: 3, name: 'Carla Dizon', course: 'BSIS', year: '3rd Year' },
    { id: 4, name: 'Daniel Reyes', course: 'BSIT', year: '4th Year' },
    { id: 5, name: 'Elaine Velasco', course: 'BSCS', year: '1st Year' },
];

const DashboardPage = () => {
    // Static initial values for posts and comments.
    // In a real application, you would fetch these from your data source
    const [initialPosts, setInitialPosts] = useState(5);
    const [initialComments, setInitialComments] = useState(6);


    return (
        <main className="p-6 bg-maroon-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-maroon-900">🎓 Dashboard</h1>

            <section className="bg-white rounded-lg shadow-md p-6 min-h-[500px]" aria-labelledby="campus-stats">
                <h2 id="campus-stats" className="text-2xl font-semibold mb-4 text-maroon-800">
                    📊 Live Campus Statistics
                </h2>

                <DashboardChart
                    students={studentsData}
                    initialPosts={initialPosts}
                    initialComments={initialComments}
                />

                <ul className="mt-6 space-y-2 text-gray-700 text-lg">
                    <li><strong>Total Students:</strong> {studentsData.length}</li>
                    <li><strong>Total Posts:</strong> {initialPosts}</li>
                    <li><strong>Total Comments:</strong> {initialComments}</li>
                </ul>
            </section>
        </main>
    );
};

export default DashboardPage;

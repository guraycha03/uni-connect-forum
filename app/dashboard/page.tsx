//   Data Visualization using ApexCharts 
//  app/dashboard/page.tsx




'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useStudentStore } from '@/store/studentStore'; // Import the store
import { usePostCommentStore } from '@/store/postCommentStore';

// Use a dynamic import to handle client-side rendering for ApexCharts
const DashboardChart = dynamic(() => import('@/components/DashboardChart'), {
    ssr: false, // Ensure the component is only rendered on the client-side
});

const DashboardPage = () => {
    const students = useStudentStore((state) => state.students);
    const posts = usePostCommentStore((state) => state.posts); // Get posts from PostCommentStore
    const [initialPosts, setInitialPosts] = useState(0); // Initialize with 0
    const [initialComments, setInitialComments] = useState(0); // Initialize with 0

    // Calculate total comments.  Moved to its own useEffect.
    useEffect(() => {
        const total = posts.reduce((acc, post) => acc + post.comments.length, 0);
        setInitialComments(total);
    }, [posts]);

    // Update initialPosts when posts change
    useEffect(() => {
        setInitialPosts(posts.length);
    }, [posts]);

    // Log the values before rendering the chart
    useEffect(() => {
        console.log('Students:', students.length);
        console.log('Posts:', initialPosts);
        console.log('Comments:', initialComments);
    }, [students.length, initialPosts, initialComments]);


    return (
        <main className="p-6 bg-maroon-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-maroon-900">🎓 Dashboard</h1>

            <section className="bg-white rounded-lg shadow-md p-6 min-h-[500px]" aria-labelledby="campus-stats">
                <h2 id="campus-stats" className="text-2xl font-semibold mb-4 text-maroon-800">
                    📊 Live Campus Statistics
                </h2>

                <DashboardChart
                    students={students.length} // Pass the *count*, not the array
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

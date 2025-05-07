//   Data Visualization using ApexCharts 
//  app/dashboard/page.tsx


'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useStudentStore } from '@/store/studentStore';
import { usePostCommentStore } from '@/store/postCommentStore';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function DashboardPage() {
    const students = useStudentStore((state) => state.students); // Get students from the store
    const posts = usePostCommentStore((state) => state.posts);

    const totalStudents = students.length; // Use the length of the students array
    const totalPosts = posts.length;
    const totalComments = posts.reduce((sum, post) => sum + post.comments.length, 0);

    const [series, setSeries] = useState<number[]>([totalStudents, totalPosts, totalComments]); // Initialize with the correct values

    useEffect(() => {
        // Update chart data when students/posts/comments change
        setSeries([totalStudents, totalPosts, totalComments]);
    }, [totalStudents, totalPosts, totalComments]);

    const chartOptions = {
        chart: {
            type: 'donut',
        },
        labels: ['Students', 'Posts', 'Comments'],
        colors: ['#b91c1c', '#2563eb', '#10b981'],
        legend: {
            position: 'bottom',
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '14px',
            },
        },
        tooltip: {
            y: {
                formatter: function (val: number) {
                    return val;
                },
            },
        },
    };

    return (
        <main className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-maroon-800 mb-6 text-center">
                📊 UniConnect Dashboard
            </h1>

            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="w-full">
                    <div className="w-full max-w-md mx-auto border border-gray-300 rounded-md bg-white shadow-sm p-4">
                        <ApexCharts
                            key={series.join('-')}
                            options={chartOptions}
                            series={series}
                            type="donut"
                            height={300}
                        />
                    </div>
                </div>

                <div className="space-y-4 text-gray-700">
                    <div className="bg-red-100 p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold text-red-600">👥 Students</h2>
                        <p className="text-2xl">{totalStudents}</p>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold text-blue-600">📝 Posts</h2>
                        <p className="text-2xl">{totalPosts}</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold text-green-600">💬 Comments</h2>
                        <p className="text-2xl">{totalComments}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
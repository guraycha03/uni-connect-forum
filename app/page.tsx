//pThis file defines the content that will be displayed at the root of the website. This is the home page or index page.

// app/page.tsx



'use client';

import React from 'react';
import { usePostCommentStore } from '@/store/postCommentStore';
import ReactApexChart from 'react-apexcharts';

const HomePage = () => {
    const posts = usePostCommentStore((state) => state.posts);
    const users = usePostCommentStore((state) => state.users);

    const totalUsers = users?.length || 0;
    const totalPosts = posts.length;
    const totalComments = posts.reduce((sum, post) => sum + post.comments.length, 0);

    const chartOptions = {
        chart: {
            type: 'donut',
        },
        labels: ['Total Students', 'Total Posts', 'Total Comments'],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    };

    const series = [totalUsers, totalPosts, totalComments];

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-6">Welcome to UniConnect</h1>

            <section className="bg-white rounded-lg shadow-md p-6" aria-labelledby="campus-stats">
                <h2 id="campus-stats" className="text-2xl font-semibold mb-4">Live Campus Statistics</h2>

                <ReactApexChart
                    options={chartOptions}
                    series={[45, 55, 15]}
                    type="donut"
                    height={350}
                />

                <ul className="mt-6 space-y-2 text-gray-700">
                    <li><strong>Total Students:</strong> {totalUsers}</li>
                    <li><strong>Total Posts:</strong> {totalPosts}</li>
                    <li><strong>Total Comments:</strong> {totalComments}</li>
                </ul>
            </section>
        </main>
    );
};

export default HomePage;

//pThis file defines the content that will be displayed at the root of the website. This is the home page or index page.

// app/page.tsx




'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePostCommentStore } from '@/store/postCommentStore';
import { useStudentStore } from '@/store/studentStore'; // Import the student store
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// 1. Define a simple loading component
const ChartLoading = () => <p>Loading Chart...</p>;

// 2. Dynamically import ApexCharts, ensuring client-side rendering
const ApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
    loading: ChartLoading,
});

const HomePage = () => {
    const posts = usePostCommentStore((state) => state.posts);
    const users = usePostCommentStore((state) => state.users);
    const addUser = usePostCommentStore((state) => state.addUser);
    const students = useStudentStore((state) => state.students); // Get students from the store
    const [chartData, setChartData] = useState<number[] | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const fetchInitialUsers = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                response.data.forEach((user) =>
                    addUser({ id: user.id.toString(), name: user.name })
                );
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchInitialUsers();
    }, [addUser]);

    useEffect(() => {
        if (isClient) {
            setChartData([students.length, posts.length, posts.reduce((sum, post) => sum + post.comments.length, 0)]);
        }
    }, [students, posts, isClient]);

    // 4. ApexCharts options
    const chartOptions = {
        chart: {
            type: 'radialBar',
            animations: {
                enabled: true,
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150,
                },
            },
        },
        series: chartData || [], // Use the chartData state
        labels: ['Total Students', 'Total Posts', 'Total Comments'],
        colors: ['#4fc3f7', '#81c784', '#ffb74d'],
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '70%',
                },
                dataLabels: {
                    name: {
                        show: true,
                    },
                    value: {
                        fontSize: '18px',
                        color: '#212121',
                    },
                    total: {
                        show: true,
                        label: 'Total',
                        formatter: function () {
                            if (!chartData) return 0;
                            return chartData.reduce((a, b) => a + b, 0);
                        },
                    },
                },
            },
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: (val: number) => val,
            },
        },
    };

    // Animation variants for the chart container
    const chartVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
    };

    // Style for number
    const numberStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#212121',
    };

    return (
        <main className="p-6 bg-maroon-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-maroon-900">🎓 Welcome to UniConnect</h1>
            <section
                className="bg-white rounded-lg shadow-md p-6 min-h-[500px]"
                aria-labelledby="campus-stats"
            >
                <h2
                    id="campus-stats"
                    className="text-2xl font-semibold mb-4 text-maroon-800"
                >
                    📊 Live Campus Statistics
                </h2>
                <motion.div
                    className="w-full h-[400px] flex items-center justify-center"
                    variants={chartVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <AnimatePresence>
                        {isClient && chartData && (
                            <div className="w-full max-w-md h-[400px] mx-auto">
                                <ApexChart
                                    options={chartOptions}
                                    series={chartData}
                                    type="radialBar"
                                    height={350}
                                    key={chartData.join('-')}
                                />
                            </div>
                        )}
                        {!isClient && <ChartLoading />}
                    </AnimatePresence>
                </motion.div>
                <ul className="mt-6 space-y-4 text-gray-700 text-lg">
                    <li className="flex justify-between items-center">
                        <span>
                            <strong>Total Students:</strong>
                        </span>{' '}
                        <span style={numberStyle}>{students.length}</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span>
                            <strong>Total Posts:</strong>
                        </span>{' '}
                        <span style={numberStyle}>{posts.length}</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span>
                            <strong>Total Comments:</strong>
                        </span>
                        <span style={numberStyle}>
                            {posts.reduce((sum, post) => sum + post.comments.length, 0)}
                        </span>
                    </li>
                </ul>
            </section>
        </main>
    );
};

export default HomePage;


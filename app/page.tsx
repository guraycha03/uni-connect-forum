//pThis file defines the content that will be displayed at the root of the website. This is the home page or index page.

// app/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePostCommentStore } from '@/store/postCommentStore';
import { useStudentStore } from '@/store/studentStore';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils"

// 1. Define a simple loading component
const ChartLoading = () => <p>Loading Chart...</p>;

// 2. Dynamically import ApexCharts, ensuring client-side rendering - Not used, but kept for potential future use
const ApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
    loading: ChartLoading,
});

const HomePage = () => {
    const posts = usePostCommentStore((state) => state.posts);
    const users = usePostCommentStore((state) => state.users);
    const addUser = usePostCommentStore((state) => state.addUser);
    const students = useStudentStore((state) => state.students);
    const [chartData, setChartData] = useState<number[] | null>(null); // Not used, but kept for potential future use
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
            setChartData([students.length, posts.length, posts.reduce((sum, post) => sum + post.comments.length, 0)]); // Not used
        }
    }, [students, posts, isClient]);

    // 4. ApexCharts options - Not used
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
        series: chartData || [],
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
                        formatter: function (val: any) {
                            return val;
                        }
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

    // Animation variants - Not used
    const chartVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
    };

    // Style for number - Not used
    const numberStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#212121',
    };

    // Variants for the introduction text
    const introVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: 'easeInOut',
            },
        },
    };

    return (
        <main
            className="min-h-screen bg-cover bg-center relative"
            style={{ backgroundImage: "url('/images/campus.jpg')" }}
        >
            <div className="p-6 bg-maroon-100/80 backdrop-blur-md flex items-center justify-center">
                {/* Introduction Text */}
                <motion.div
                    className="text-center p-4"
                    variants={introVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="bg-white/80 rounded-xl p-8 max-w-3xl mx-auto  border border-maroon-200"
                         style={{ paddingLeft: '8rem', paddingRight: '8rem' }}
                    >
                        <h2 className="text-5xl font-extrabold text-maroon-900 mb-8 tracking-tight drop-shadow-2xl text-stroke-2 text-stroke-maroon-300">
                            <span className="bg-gradient-to-r from-maroon-500 to-maroon-700 text-transparent bg-clip-text">
                                Connecting Our Campus Community
                            </span>
                        </h2>
                        <p className="text-3xl text-gray-800 leading-relaxed font-black">
                            <span className="font-black text-maroon-600">UniConnect</span> is your central hub for staying connected with everything
                            happening at our university. From keeping up with campus news and events to
                            collaborating with fellow students, <span className="font-black text-maroon-600">UniConnect</span> provides the tools you need to
                            thrive.
                        </p>
                        <p className="text-2xl text-gray-700 mt-8  ">
                            <span className="font-bold">Embrace the future of campus connectivity!</span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

export default HomePage;

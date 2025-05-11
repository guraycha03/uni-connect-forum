// home page
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
                    className="flex items-center justify-center min-h-screen p-6"
                    variants={introVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="bg-white/70 rounded-2xl shadow-xl border border-maroon-200 px-10 py-12 max-w-4xl mx-auto backdrop-blur-sm">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-maroon-800 mb-6 text-center leading-tight drop-shadow">
                            🎓 Welcome to the Official Student Portal of Bulan State University!
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-6 text-center">
                            This platform is designed to connect, inform, and support every BSU student.
                            <br />
                            From announcements and academic schedules to student discussions and organization activities — everything you need is just a click away.
                        </p>
                        <ul className="text-lg md:text-xl text-gray-700 font-medium mb-6 text-center space-y-2">
                            <li>🔐 Your voice matters.</li>
                            <li>📢 Stay updated.</li>
                            <li>🤝 Engage with the community.</li>
                        </ul>
                        <p className="text-xl md:text-2xl text-gray-800 text-center font-semibold">
                            Whether you're here to check your exam schedules, post ideas, or connect with fellow students, this is your digital home at BSU.
                            <br />
                            <span className="block mt-4 text-maroon-700 font-bold">
                                Let’s build a smarter, stronger, and more united student community — together.
                            </span>
                        </p>
                    </div>
                </motion.div>


            </div>
        </main>
    );
};

export default HomePage;

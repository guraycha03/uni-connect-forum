// home page
// app/page.tsx



'use client';

import React, { useEffect, useState } from 'react';
import { usePostCommentStore } from '@/store/postCommentStore';
import { useStudentStore } from '@/store/studentStore';
import axios from 'axios';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Import the cn utility
import Image from 'next/image'; // Import Next.js Image component

// Define a type for the user object based on the expected API response
interface User {
    id: number;
    name: string;
    username?: string;
    email?: string;
    address?: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone?: string;
    website?: string;
    company?: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

const HomePage = () => {
    const posts = usePostCommentStore((state) => state.posts);
    const users = usePostCommentStore((state) => state.users);
    const addUser = usePostCommentStore((state) => state.addUser);
    const students = useStudentStore((state) => state.students);
    const [chartData, setChartData] = useState<number[] | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const fetchInitialUsers = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                // Explicitly type the response data as an array of User objects
                const userData: User[] = response.data;
                userData.forEach((user) =>
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
            setChartData([
                students.length,
                posts.length,
                posts.reduce((sum, post) => sum + post.comments.length, 0)
            ]);
        }
    }, [students, posts, isClient]);

    const introVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    };

    return (
        <main className="min-h-screen bg-gray-100">
            {/* Top background image (half screen height) */}
            <div className="relative h-[50vh] w-full">
                <Image
                    src="/images/campus.jpg"
                    alt="Campus Image"
                    layout="fill"
                    objectFit="cover"
                    priority // Optional:  Improves LCP if this is a priority image
                />
            </div>

            {/* Welcome Section */}
            <motion.div
                className={cn(
                    "max-w-5xl mx-auto px-6 py-12 -mt-24 relative z-10",
                    "bg-white rounded-2xl shadow-lg",
                    "border border-maroon-200"
                )}
                variants={introVariants}
                initial="hidden"
                animate="visible"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-maroon-800 mb-6 text-center leading-tight drop-shadow">
                    Welcome to the Official Student Portal of Bulan State University!
                </h1>
            </motion.div>

            {/* About Section */}
            <section className="bg-maroon-50 py-16 px-6">
                <div className={cn(
                    "max-w-4xl mx-auto",
                    "bg-white border border-maroon-100 shadow-md rounded-xl p-8"
                )}>
                    <h2 className="text-3xl font-bold text-maroon-800 text-center mb-4">
                        About the Portal
                    </h2>
                    <p className="text-lg text-maroon-700 text-center leading-relaxed">
                        The Bulan State University Student Portal serves as your digital companion in navigating campus life.
                        From announcements and academic schedules to student discussions and organization activities — everything you need is centralized here.
                    </p>
                    <p className="text-lg text-maroon-700 text-center mt-4 font-semibold">
                        Stay informed. Share your ideas. Connect with the community.
                        Together, we build a smarter, stronger, and more united BSU.
                    </p>
                    <br /><br />
                </div>
            </section>
        </main>
    );
};

export default HomePage;

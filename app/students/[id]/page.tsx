

// student profile page





// app/students/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import GoogleMapEmbed from '@/components/GoogleMapEmbed'; // Import the new component

// ===============================
// Types & Interfaces
// ===============================

interface Student {
    id: string;
    name: string;
    studentNo: string;
    course: string;
    yearBlock: string;
    email: string;
    address: string;
    profileImage: string;
    mapEmbedCode: string; // Add this field for the map embed code
}

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

// ===============================
// Helper Functions
// ===============================

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Stagger the appearance of children
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

/**
 * Displays a single student's profile information.
 */
const StudentProfilePage: React.FC = () => {
    const { id } = useParams();

    //  Use the initialStudents data directly.  No need to duplicate.
    const initialStudents: Student[] = [
        {
            id: "charisse_guray_0",
            name: "Charisse Guray",
            studentNo: "20230000",
            course: "BSIT",
            yearBlock: "2-1",
            email: "charisse.guray@example.com",
            address: "Bulan, Sorsogon",
            profileImage: "/images/students/cha.gif",
            mapEmbedCode: `<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Inararan%2C+Bulan%2C+Sorsogon&output=embed"></iframe></div><a href="https://mapembeds.com" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">mapembeds.com</a></div>`, // Embed Code for Charisse
        },
        {
            id: "miguel_torres_1",
            name: "Miguel Torres",
            studentNo: "20230001",
            course: "BSIS",
            yearBlock: "2-2",
            email: "miguel.torres@example.com",
            address: "Santiago, Isabela",
            profileImage: "/images/students/student_ (2).jpeg",
            mapEmbedCode: `<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Santiago,+Isabela&output=embed"></iframe></div><a href="https://mapembeds.com" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Santiago,+Isabela&output=embed"></iframe></div>`, // Example Embed Code
        },
        {
            id: "angelica_cruz_2",
            name: "Angelica Cruz",
            studentNo: "20230002",
            course: "BSCS",
            yearBlock: "3-1",
            email: "angelica.cruz@example.com",
            address: "Albay, Bicol",
            profileImage: "/images/students/student_ (3).jpeg",
            mapEmbedCode: `<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Albay,+Bicol&output=embed"></iframe></div><a href="https://mapembeds.com" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Albay,+Bicol&output=embed"></iframe></div>`, // Example Embed Code
        },
    ];

    const student = initialStudents.find((s) => s.id === id);

    if (!student) {
        return <p className="text-center mt-10 text-red-500">Student not found</p>;
    }

    const [studentPosts, setStudentPosts] = useState<Post[]>([]);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [postsError, setPostsError] = useState<string | null>(null);


    // Fetch posts for the selected student
    useEffect(() => {
        const fetchStudentPosts = async () => {
            setLoadingPosts(true);
            setPostsError(null);
            try {
                // Simulate a random number of posts (0-5) for each student.
                const numberOfPosts = Math.floor(Math.random() * 6);
                let fetchedPosts: Post[] = [];

                if (numberOfPosts > 0) {
                    // Fetch posts only if numberOfPosts is greater than 0
                    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${student.id}`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch posts for student ${student.id}`);
                    }
                    const data: Post[] = await response.json();
                    fetchedPosts = data.slice(0, numberOfPosts); // Get only the required number of posts
                }
                setStudentPosts(fetchedPosts);
            } catch (error: any) {
                setPostsError(error.message);
            } finally {
                setLoadingPosts(false);
            }
        };

        fetchStudentPosts();
    }, [student.id]);

    return (
        <motion.div
            className="max-w-3xl mx-auto mt-10 student-profile-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="student-profile-header">
                <motion.img
                    src={student.profileImage}
                    alt={`${student.name}'s profile`}
                    className="student-profile-image-small"
                    variants={itemVariants}
                />
                <motion.h1 className="student-profile-name" variants={itemVariants}>
                    {student.name}
                </motion.h1>
            </div>

            <div className="student-profile-info">
                <motion.div variants={itemVariants}>
                    <strong className="block text-sm text-gray-500">Student No.</strong>
                    <span className="text-lg">{student.studentNo}</span>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <strong className="block text-sm text-gray-500">Course</strong>
                    <span className="text-lg">{student.course}</span>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <strong className="block text-sm text-gray-500">Year & Block</strong>
                    <span className="text-lg">{student.yearBlock}</span>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <strong className="block text-sm text-gray-500">Email</strong>
                    <span className="text-lg">{student.email}</span>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <strong className="block text-sm text-gray-500">Address</strong>
                    <span className="text-lg">{student.address}</span>
                </motion.div>
            </div>

            <motion.div className="mt-8" variants={itemVariants}>
                <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">Student Location</h2>
                <GoogleMapEmbed embedCode={student.mapEmbedCode} />
            </motion.div>

            {/* Display Student Posts */}
            <motion.div className="mt-8" variants={itemVariants}>
                <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">Student Posts</h2>
                {loadingPosts ? (
                    <p className="text-gray-500">Loading posts...</p>
                ) : postsError ? (
                    <p className="text-red-500">Error: {postsError}</p>
                ) : studentPosts.length > 0 ? (
                    <AnimatePresence>
                        {studentPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="mb-4 p-4 bg-[var(--accent)] rounded-lg shadow-md"
                            >
                                <h3 className="text-lg font-semibold text-[var(--foreground)]">{post.title}</h3>
                                <p className="text-sm text-[var(--secondary)]">
                                    {post.body}
                                </p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                ) : (
                    <p className="text-gray-500">No posts found for this student.</p>
                )}
            </motion.div>
        </motion.div>
    );
};

export default StudentProfilePage;


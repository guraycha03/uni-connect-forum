// app/students/[id]/page.tsx



'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStudentStore } from '@/store/studentStore';
import GoogleMapEmbed from '@/components/GoogleMapEmbed'; // Import the GoogleMapEmbed component

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
    mapEmbedCode?: string; // Make mapEmbedCode optional
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
    const setInitialStudents = useStudentStore((state) => state.setInitialStudents);
    const initialStudents: Student[] = [
        {
            id: "charisse_guray_0",
            name: "Charisse Guray",
            studentNo: "20230000",
            course: "BSIT",
            yearBlock: "2-1",
            email: "charisse.guray@example.com",
            address: "Inararan, Bulan, Sorsogon",
            profileImage: "/images/students/cha.gif",
            mapEmbedCode: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.651594218768!2d124.0673898!3d12.6787498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a0853549755c5d%3A0x9b22a15e98b84b5!2sBulan%2C%20Sorsogon!5e0!3m2!1sen!2sph!4v1708089278788!5m2!1sen!2sph" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        },
        {
            id: "miguel_torres_1",
            name: "Miguel Torres",
            studentNo: "20230001",
            course: "BSIS",
            yearBlock: "2-2",
            email: "miguel.torres@example.com",
            address: "San Vicente, Bulan, Sorsogon",
            profileImage: "/images/students/student_ (2).jpeg",
            mapEmbedCode: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.651594218768!2d124.0673898!3d12.6787498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a0853549755c5d%3A0x9b22a15e98b84b5!2sBulan%2C%20Sorsogon!5e0!3m2!1sen!2sph!4v1708089278788!5m2!1sen!2sph" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        },
        {
            id: "angelica_cruz_2",
            name: "Angelica Cruz",
            studentNo: "20230002",
            course: "BSCS",
            yearBlock: "3-1",
            email: "angelica.cruz@example.com",
            address: "Zone 8, Bulan, Sorsogon",
            profileImage: "/images/students/student_ (3).jpeg",
            mapEmbedCode: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.651594218768!2d124.0673898!3d12.6787498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a0853549755c5d%3A0x9b22a15e98b84b5!2sBulan%2C%20Sorsogon!5e0!3m2!1sen!2sph!4v1708089278788!5m2!1sen!2sph" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        },
        {
            id: "daniel_navarro_3",
            name: "Daniel Navarro",
            studentNo: "20230003",
            course: "BSA",
            yearBlock: "4-2",
            email: "daniel.navarro@example.com",
            address: "San Juan, Bulan, Sorsogon",
            profileImage: "/images/students/student_ (4).jpeg",
            mapEmbedCode: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.651594218768!2d124.0673898!3d12.6787498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a0853549755c5d%3A0x9b22a15e98b84b5!2sBulan%2C%20Sorsogon!5e0!3m2!1sen!2sph!4v1708089278788!5m2!1sen!2sph" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        },
        {
            id: "frances_santos_4",
            name: "Frances Santos",
            studentNo: "20230004",
            course: "BSAIS",
            yearBlock: "1-3",
            email: "frances.santos@example.com",
            address: "Otavi, Bulan, Sorsogon",
            profileImage: "/images/students/student_ (5).jpeg",
            mapEmbedCode: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.651594218768!2d124.0673898!3d12.6787498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a0853549755c5d%3A0x9b22a15e98b84b5!2sBulan%2C%20Sorsogon!5e0!3m2!1sen!2sph!4v1708089278788!5m2!1sen!2sph" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        },
        {
            id: "mark_yu_5",
            name: "Mark Yu",
            studentNo: "20230005",
            course: "BPA",
            yearBlock: "2-1",
            email: "mark.yu@example.com",
            address: "San Ramon, Bulan, Sorsogon",
            profileImage: "/images/students/student_ (6).jpeg",
            mapEmbedCode: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.651594218768!2d124.0673898!3d12.6787498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a0853549755c5d%3A0x9b22a15e98b84b5!2sBulan%2C%20Sorsogon!5e0!3m2!1sen!2sph!4v1708089278788!5m2!1sen!2sph" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        },
        {
            id: "janine_dela_cruz_6",
            name: "Janine Dela Cruz",
            studentNo: "20230006",
            course: "BSE",
            yearBlock: "3-2",
            email: "janine.delacruz@example.com",
            address: "Patag, Irosin, Sorsogon",
            profileImage: "/images/students/student_ (7).jpeg",
            mapEmbedCode: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.651594218768!2d124.0673898!3d12.6787498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a0853549755c5d%3A0x9b22a15e98b84b5!2sBulan%2C%20Sorsogon!5e0!3m2!1sen!2sph!4v1708089278788!5m2!1sen!2sph" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        },
        {
            id: "ella_manalo_8",
            name: "Ella Manalo",
            studentNo: "20230008",
            course: "BSIT",
            yearBlock: "1-2",
            email: "ella.manalo@example.com",
            address: "Aguada, Magallanes, Sorsogon",
            profileImage: "/images/students/student_ (9).jpeg",
            mapEmbedCode: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.2872390702715!2d123.83442433503198!3d12.607119169472146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a07f418c99539d%3A0x745915782989b17f!2sMagallanes%2C%20Sorsogon!5e0!3m2!1sen!2sph!4v1708089702299!5m2!1sen!2sph" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        }
    ];
    useEffect(() => {
        setInitialStudents(initialStudents); // Populate the store on component mount
    }, [setInitialStudents, initialStudents]);

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
            className="max-w-3xl mx-auto mt-10 student-profile-container p-6 bg-gray-100 rounded-lg shadow-md"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="mb-6 flex flex-col items-center">
                <img
                    src={student.profileImage || '/images/default.jpeg'}
                    alt={`Profile of ${student.name}`}
                    className="w-20 h-20 rounded-full shadow-md" // Increased size
                />
                <h2 className="text-2xl font-semibold mt-4 text-gray-800">{student.name}</h2>
                <p className="text-gray-600">{student.course} - {student.yearBlock}</p>
            </div>

            <div className="mb-4">
                <strong className="text-gray-700">Student ID:</strong> {student.studentNo}
            </div>
            <div className="mb-4">
                <strong className="text-gray-700">Email:</strong> {student.email}
            </div>
            <div className="mb-4">
                <strong className="text-gray-700">Address:</strong> {student.address}
            </div>

            {student.mapEmbedCode && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Location</h3>
                    <div className="flex justify-center">
                        <GoogleMapEmbed embedCode={student.mapEmbedCode} />
                    </div>
                </div>
            )}

            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Recent Posts</h3>
                {loadingPosts && <p className="text-center text-gray-600">Loading posts...</p>}
                {postsError && <p className="text-center text-red-500">Error loading posts: {postsError}</p>}
                {studentPosts.length > 0 ? (
                    <ul>
                        {studentPosts.map(post => (
                            <li key={post.id} className="mb-2 border-b pb-2">
                                <strong className="text-indigo-600">{post.title}</strong>
                                <p className="text-gray-700">{post.body}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loadingPosts && !postsError && (
                        <p className="text-center text-gray-600">No posts available for this student.</p>
                    )
                )}
            </div>
        </motion.div>
    );
};

export default StudentProfilePage;




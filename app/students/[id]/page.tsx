// app/students/[id]/page.tsx


'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStudentStore } from '@/store/studentStore';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import Image from 'next/image';

interface Student {
    id: string;
    name: string;
    studentNo: string;
    course: string;
    yearBlock: string;
    email: string;
    address: string;
    profileImage: string;
    mapEmbedCode?: string;
}

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

const StudentProfilePage: React.FC = () => {
    const { id } = useParams();
    const setInitialStudents = useStudentStore((state) => state.setInitialStudents);
    const initialStudents: Student[] = React.useMemo(() => [
        {
            id: "1",
            name: "Miguel Torres",
            studentNo: "20230001",
            course: "BSIS",
            yearBlock: "2-2",
            email: "miguel.torres@gmail.com",
            address: "San Vicente, Bulan, Sorsogon",
            profileImage: "/images/students/migs.jpeg",
            mapEmbedCode: '<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=San+Vicente%2C+Bulan%2C+Sorsogon&output=embed"></iframe></div><a href="https://embedcodesgenerator.com/" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">embedcodesgenerator.com</a></div>',
        },
        {
            id: "2",
            name: "Angelica Cruz",
            studentNo: "20230002",
            course: "BSCS",
            yearBlock: "3-1",
            email: "angelica.cruz@gmail.com",
            address: "Zone 8, Bulan, Sorsogon",
            profileImage: "/images/students/angel.jpeg",
            mapEmbedCode: '<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Zone+8%2C+Bulan%2C+Sorsogon&output=embed"></iframe></div><a href="https://testosteronetherapy.org/" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">testosteronetherapy.org</a></div>',
        },
        {
            id: "3",
            name: "Daniel Navarro",
            studentNo: "20230003",
            course: "BSA",
            yearBlock: "4-2",
            email: "daniel.navarro@gmail.com",
            address: "San Juan, Bulan, Sorsogon",
            profileImage: "/images/students/dan.jpeg",
            mapEmbedCode: '<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=San+Juan%2C+Bulan%2C+Sorsogon&output=embed"></iframe></div><a href="http://aiyoutubetitlegenerator.com/" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">aiyoutubetitlegenerator.com</a></div>',
        },
        {
            id: "4",
            name: "Mark Yu",
            studentNo: "20230005",
            course: "BPA",
            yearBlock: "2-1",
            email: "mark.yu@gmail.com",
            address: "San Ramon, Bulan, Sorsogon",
            profileImage: "/images/students/yu.png",
            mapEmbedCode: '<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=San+Ramon%2C+Bulan%2C+Sorsogon&output=embed"></iframe></div><a href="https://testosteronetherapy.org/" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">testosteronetherapy.org</a></div>',
        },
        {
            id: "5",
            name: "Janine Dela Cruz",
            studentNo: "20230006",
            course: "BSE",
            yearBlock: "3-2",
            email: "janine.delacruz@gmail.com",
            address: "Patag, Irosin, Sorsogon",
            profileImage: "/images/students/janine.jpeg",
            mapEmbedCode: '<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Patag%2C+Irosin%2C+Sorsogon&output=embed"></iframe></div><a href="https://testosteronetherapy.org/" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">testosteronetherapy.org</a></div>',
        },
        {
            id: "6",
            name: "Kevin Bautista",
            studentNo: "20230007",
            course: "BTVTED",
            yearBlock: "4-1",
            email: "kevin.bautista@gmail.com",
            address: "Tughan, Juban, Sorsogon",
            profileImage: "/images/students/kev.jpeg",
            mapEmbedCode: '<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Tughan%2C+Juban%2C+Sorsogon&output=embed"></iframe></div><a href="https://tariffcalculator.us/" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">tariffcalculator.us</a></div>',
        },
        {
            id: "7",
            name: "Ella Manalo",
            studentNo: "20230008",
            course: "BSIT",
            yearBlock: "1-2",
            email: "ella.manalo@gmail.com",
            address: "Aguada, Magallanes, Sorsogon",
            profileImage: "/images/students/ella.jpeg",
            mapEmbedCode: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.2872390702715!2d123.83442433503198!3d12.607119169472146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a07f418c99539d%3A0x745915782989b17f!2sMagallanes%2C%20Sorsogon!5e0!3m2!1sen!2sph!4v1708089702299!5m2!1sen!2sph" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        },
        {
            id: "8",
            name: "Andrew Salazar",
            studentNo: "20230009",
            course: "BSIS",
            yearBlock: "2-3",
            email: "andrew.salazar@example.com",
            address: "Balocawe, Matnog, Sorsogon",
            profileImage: "/images/students/andrew.jpeg",
            mapEmbedCode: '<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Balocawe%2C+Matnog%2C+Sorsogon&output=embed"></iframe></div><a href="https://embeddablemap.com/" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">embeddablemap.com</a></div>',
        },
        {
            id: "9",
            name: "Patricia Villanueva",
            studentNo: "20230010",
            course: "BSCS",
            yearBlock: "3-1",
            email: "patricia.villanueva@example.com",
            address: "Dancalan, Bulusan, Sorsogon",
            profileImage: "/images/students/pat.png",
            mapEmbedCode: '<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Dancalan%2C+Bulusan%2C+Sorsogon&output=embed"></iframe></div><a href="https://aitohumanizetextconverter.com/" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">aitohumanizetextconverter.com</a></div>',
        },
        {
            id: "10",
            name: "Justin Reyes",
            studentNo: "20230011",
            course: "BSA",
            yearBlock: "4-2",
            email: "justin.reyes@example.com",
            address: "San Bernardo, Bulusan, Sorsogon",
            profileImage: "/images/students/reyes.jpeg",
            mapEmbedCode: '<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=San+Bernardo%2C+Bulusan%2C+Sorsogon&output=embed"></iframe></div><a href="https://viralnado.net/" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">viralnado.net</a></div>',
        },
        {
            id: "11",
            name: "Luisa Mendoza",
            studentNo: "20230014",
            course: "BSE",
            yearBlock: "3-2",
            email: "luisa.mendoza@example.com",
            address: "Calomagon, Bulan, Sorsogon",
            profileImage: "/images/students/luisa.jpeg",
            mapEmbedCode: '<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Calomagon%2C+Bulan%2C+Sorsogon&output=embed"></iframe></div><a href="https://freeairecipegenerator.com" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">freeairecipegenerator.com</a></div>',
        },
        {
            id: "12",
            name: "Ronald De La Cruz",
            studentNo: "20230015",
            course: "BTVTED",
            yearBlock: "4-1",
            email: "ronald.delacruz@example.com",
            address: "Zone 4, Bulan, Sorsogon",
            profileImage: "/images/students/ron.jpeg",
            mapEmbedCode: '<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Zone+4%2C+Bulan%2C+Sorsogon&output=embed"></iframe></div><a href="https://embedcodesgenerator.com/" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">embedcodesgenerator.com</a></div>',
        },
        {
            id: "13",
            name: "Sophia Soriano",
            studentNo: "20230016",
            course: "BSIT",
            yearBlock: "1-3",
            email: "mariel.soriano@example.com",
            address: "Sagrada Familia, Bulan, Sorsogon",
            profileImage: "/images/students/sop.jpeg",
            mapEmbedCode: '<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Sagrada+Familia%2C+Bulan%2C+Sorsogon&output=embed"></iframe></div><a href="https://embedcodesgenerator.com/" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">embedcodesgenerator.com</a></div>',
        },
        {
            id: "14",
            name: "Joseph Galang",
            studentNo: "20230017",
            course: "BSIS",
            yearBlock: "2-1",
            email: "joseph.galang@example.com",
            address: "Inararan, Bulan, Sorsogon",
            profileImage: "/images/students/jo.jpeg",
            mapEmbedCode: '<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Inararan%2C+Bulan%2C+Sorsogon&output=embed"></iframe></div><a href="https://viralnado.net/" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">viralnado.net</a></div>',
        },
        {
            id: "15",
            name: "Bea Quijano",
            studentNo: "20230018",
            course: "BSCS",
            yearBlock: "3-2",
            email: "bea.quijano@example.com",
            address: "Zone 1, Bulan, Sorsogon",
            profileImage: "/images/students/bea.jpeg",
            mapEmbedCode: '<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Zone+1%2C+Bulan%2C+Sorsogon&output=embed"></iframe></div><a href="https://embeddablemap.com/" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">embeddablemap.com</a></div>',
        },
        {
            id: "16",
            name: "Ryan Lopez",
            studentNo: "20230019",
            course: "BSA",
            yearBlock: "4-1",
            email: "ryan.lopez@example.com",
            address: "Zone 2, Bulan, Sorsogon",
            profileImage: "/images/students/ryan.jpeg",
            mapEmbedCode: '<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Zone+2%2C+Bulan%2C+Sorsogon&output=embed"></iframe></div><a href="https://embedcodesgenerator.com/" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">embedcodesgenerator.com</a></div>',
        },
        {
            id: "17",
            name: "Katrina Valdez",
            studentNo: "20230020",
            course: "BSAIS",
            yearBlock: "1-2",
            email: "katrina.valdez@example.com",
            address: "Zone 6, Bulan, Sorsogon",
            profileImage: "/images/students/kat.png",
            mapEmbedCode: '<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Zone+6%2C+Bulan%2C+Sorsogon&output=embed"></iframe></div><a href="https://freeairecipegenerator.com" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">freeairecipegenerator.com</a></div>',
        },
        {
            id: "18",
            name: "Enzo Ramos",
            studentNo: "20230021",
            course: "BPA",
            yearBlock: "2-3",
            email: "enzo.ramos@example.com",
            address: "Zone 3, Bulan, Sorsogon",
            profileImage: "/images/students/enzo.jpeg",
            mapEmbedCode: '<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Zone+3%2C+Bulan%2C+Sorsogon&output=embed"></iframe></div><a href="http://aiyoutubetitlegenerator.com/" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">aiyoutubetitlegenerator.com</a></div>',
        },
        {
            id: "19",
            name: "Charmaine Garcia",
            studentNo: "20230022",
            course: "BSE",
            yearBlock: "3-1",
            email: "charmaine.garcia@example.com",
            address: "Zone 7, Bulan, Sorsogon",
            profileImage: "/images/students/char.jpeg",
            mapEmbedCode: '<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Zone+7%2C+Bulan%2C+Sorsogon&output=embed"></iframe></div><a href="https://eatcolumbus.com/" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">eatcolumbus.com</a></div>',
        },
        {
            id: "20",
            name: "Daryl Morales",
            studentNo: "20230023",
            course: "BTVTED",
            yearBlock: "4-2",
            email: "daryl.morales@example.com",
            address: "Tughan, Juban, Sorsogon",
            profileImage: "/images/students/daryl.jpeg",
            mapEmbedCode: '<div style="position: relative;"><div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=Tughan%2C+Juban%2C+Sorsogon&output=embed"></iframe></div><a href="https://freeairecipegenerator.com" rel="noopener" target="_blank" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;">freeairecipegenerator.com</a></div>',
        },
    ], []);

    const [studentPosts, setStudentPosts] = useState<Post[]>([]);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [postsError, setPostsError] = useState<string | null>(null);
    const [student, setStudent] = useState<Student | undefined>(undefined);


    useEffect(() => {
        setInitialStudents(initialStudents);
    }, [setInitialStudents, initialStudents]);

    useEffect(() => {
        const foundStudent = initialStudents.find((s) => s.id === id);
        setStudent(foundStudent);
    }, [id, initialStudents]);


    const fetchStudentPosts = useCallback(async (studentId: string) => {
        setLoadingPosts(true);
        setPostsError(null);
        try {
            const numberOfPosts = Math.floor(Math.random() * 6);
            let fetchedPosts: Post[] = [];

            if (numberOfPosts > 0) {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${studentId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch posts for student ${studentId}`);
                }
                const data: Post[] = await response.json();
                fetchedPosts = data.slice(0, numberOfPosts);
            }
            setStudentPosts(fetchedPosts);
        } catch (error: any) {
            setPostsError(error.message);
        } finally {
            setLoadingPosts(false);
        }
    }, []);

    useEffect(() => {
        if (student) {
            fetchStudentPosts(student.id);
        }

    }, [fetchStudentPosts, student]);



    if (!student) {
        return <p className="text-center mt-10 text-red-500">Student not found</p>;
    }

    return (
        <motion.div
            className="max-w-3xl mx-auto mt-10 student-profile-container p-6 bg-gray-100 rounded-lg shadow-md"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="mb-6 flex flex-col items-center">
                <Image
                    src={student.profileImage || '/images/default.jpeg'}
                    alt={`Profile of ${student.name}`}
                    className="w-96 h-96 shadow-md"
                    width={360}
                    height={360}
                    objectFit="cover"
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


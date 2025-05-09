//   app\students\page.tsx



'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface Student {
    id: string;
    name: string;
    studentNo?: string;  // Added optional studentNo
    course: string;
    yearBlock: string;
    email: string;
    address: string;
    profileImage: string;
}

const cn = (...args: any[]) => args.filter(Boolean).join(' ');

const studentCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
    hover: { scale: 1.03, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', transition: { duration: 0.2 } },
};

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
    },
    {
        id: "kevin_bautista_7",
        name: "Kevin Bautista",
        studentNo: "20230007",
        course: "BTVTED",
        yearBlock: "4-1",
        email: "kevin.bautista@example.com",
        address: "Tughan, Juban, Sorsogon",
        profileImage: "/images/students/student_ (8).jpeg",
    }
];

export default function StudentsPage() {
    const [students] = useState(initialStudents); // Removed setStudents and useEffect
    const [searchQuery, setSearchQuery] = useState('');
    const [courseFilter, setCourseFilter] = useState('all');
    const [yearBlockFilter, setYearBlockFilter] = useState('all');

    const uniqueCourses = ['all', ...new Set(initialStudents.map(s => s.course).filter(Boolean))];
    const uniqueYearBlocks = ['all', ...new Set(initialStudents.map(s => s.yearBlock).filter(Boolean))];

    const filteredStudents = students.filter(student => {
        const searchMatch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (student.studentNo && student.studentNo.includes(searchQuery)); // Added check for studentNo
        const courseMatch = courseFilter === 'all' || student.course === courseFilter;
        const yearBlockMatch = yearBlockFilter === 'all' || student.yearBlock === yearBlockFilter;
        return searchMatch && courseMatch && yearBlockMatch;
    });

    return (
        <main className="min-h-screen px-4 py-10 bg-[var(--background)]">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-[var(--primary)] mb-6">
                    Student Directory
                </h1>

                <div className="mb-6 flex flex-wrap items-center gap-4">
                    <div className="relative flex-grow min-w-[200px]">
                        <input
                            type="text"
                            placeholder="Search by name or ID"
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-md shadow-sm focus:ring-[var(--primary)] focus:border-[var(--primary)] focus:outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                        </div>
                    </div>

                    <div className="relative min-w-[150px]">
                        <select
                            value={courseFilter}
                            onChange={(e) => setCourseFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-md shadow-sm focus:ring-[var(--primary)] focus:border-[var(--primary)] focus:outline-none appearance-none pr-8"
                        >
                            <option value="all">All Courses</option>
                            {uniqueCourses.slice(1).map(course => (
                                <option key={course} value={course}>{course}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                        </div>
                    </div>

                    <div className="relative min-w-[150px]">
                        <select
                            value={yearBlockFilter}
                            onChange={(e) => setYearBlockFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-md shadow-sm focus:ring-[var(--primary)] focus:border-[var(--primary)] focus:outline-none appearance-none pr-8"
                        >
                            <option value="all">All Year/Block</option>
                            {uniqueYearBlocks.slice(1).map(yearBlock => (
                                <option key={yearBlock} value={yearBlock}>{yearBlock}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                        </div>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredStudents.map((student) => (
                        <Link href={`/students/${student.id}`} key={student.id} passHref>
                            <motion.div
                                variants={studentCardVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                                className="group"
                            >
                                <div className="border border-[var(--border)] bg-white dark:bg-[var(--accent)] shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer rounded-lg">
                                    <div className="p-6">
                                        <div className="flex flex-col items-center gap-4 mb-4">
                                            <div className="student-image-container">
                                                <img
                                                    src={student.profileImage || '/images/default.jpeg'}
                                                    alt={`Profile of ${student.name}`}
                                                    className="student-image"
                                                />
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] text-center">
                                                    {student.name}
                                                </h2>
                                                <p className="text-sm text-[var(--secondary)] text-center">
                                                    {student.email}
                                                </p>
                                                <p className="text-xs text-gray-500 text-center">{student.course} - {student.yearBlock}</p>
                                            </div>
                                        </div>
                                        {student.studentNo && (
                                            <p className="text-sm text-gray-500 text-center student-id">
                                                ID: {student.studentNo}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {filteredStudents.length === 0 && (
                    <p className="text-center text-gray-600 mt-6">No students found matching your criteria.</p>
                )}
            </div>
        </main>
    );
}


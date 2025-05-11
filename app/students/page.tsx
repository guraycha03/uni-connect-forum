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
        id: "1",
        name: "Miguel Torres",
        studentNo: "20230001",
        course: "BSIS",
        yearBlock: "2-2",
        email: "miguel.torres@gmail.com",
        address: "San Vicente, Bulan, Sorsogon",
        profileImage: "/images/students/migs.jpeg",
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
    },
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


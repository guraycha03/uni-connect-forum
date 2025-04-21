// app/students/[id]/page.tsx


'use client';

import { useRouter } from 'next/router';

export default function StudentProfilePage() {
  const router = useRouter();
  const { id } = router.query; // This is the dynamic route based on the student id

  // Convert the mockStudents object to an array for easy searching
  const students = [
    {
      id: 'cha',
      name: 'Charisse G. Guray',
      studentNo: '12345678',
      course: 'BSIT',
      yearBlock: '2-1',
      status: 'Officially Enrolled',
      email: 'guraycha@gmail.com',
      address: 'Inararan, Bulan, Sorsogon',
      profileImage: '/images/cha.jpg', // Example profile image path
    },
    {
      id: 'sora',
      name: 'Jin Sora',
      studentNo: '23456789',
      course: 'BSIT',
      yearBlock: '2-2',
      status: 'Graduated',
      email: 'sora@kdramail.com',
      address: 'Manila, Philippines',
      profileImage: '/images/sora.jpg', // Example profile image path
    },
    // Add other students here...
  ];

  // Find the student by id from the query parameter
  const student = students.find((student) => student.id === id);

  // If no student is found, show an error message
  if (!student) {
    return <p>Student not found</p>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-center mb-4">
        <img
          src={student.profileImage}
          alt={`${student.name}'s profile`}
          className="w-32 h-32 rounded-full border-2 border-gray-300"
        />
      </div>
      <h1 className="text-3xl font-bold mb-2">{student.name}</h1>
      <p className="text-lg">Email: {student.email}</p>
      <p className="text-lg">Status: {student.status}</p>
      <p className="text-lg">Student No: {student.studentNo}</p>
      <p className="text-lg">Course: {student.course}</p>
      <p className="text-lg">Year/Block: {student.yearBlock}</p>
      <p className="text-lg">Address: {student.address}</p>
    </div>
  );
}

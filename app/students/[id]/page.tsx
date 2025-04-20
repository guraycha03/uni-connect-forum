// app/students/[id]/page.tsx



'use client';

import { useParams } from 'next/navigation';

const mockStudents = {
  cha: {
    name: 'Cha Guray',
    email: 'cha@guray.com',
    status: 'Enrolled',
    bio: 'A passionate IT student with interest in AI and design.',
  },
  sora: {
    name: 'Jin Sora',
    email: 'sora@kdramail.com',
    status: 'Graduated',
    bio: 'Loves drama, coding, and exploring new tech.',
  },
};

export default function StudentProfilePage() {
  const params = useParams();

  // Ensure params.id exists and is one of the keys in mockStudents
  const studentId = params?.id;
  
  // Type Guard: Check if studentId exists in mockStudents
  if (!studentId || !mockStudents[studentId as keyof typeof mockStudents]) {
    return <div className="p-6">Student not found.</div>;
  }

  // Safely cast studentId
  const student = mockStudents[studentId as keyof typeof mockStudents];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{student.name}'s Profile</h1>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Status:</strong> {student.status}</p>
      <p><strong>Bio:</strong> {student.bio}</p>
    </div>
  );
}

'use client';

import { useState } from 'react';

interface Student {
  id: number;
  name: string;
  course: string;
  year: string;
}

const studentsData: Student[] = [
  { id: 1, name: 'Alice Santiago', course: 'BSIT', year: '1st Year' },
  { id: 2, name: 'Brian Cruz', course: 'BSCS', year: '2nd Year' },
  { id: 3, name: 'Carla Dizon', course: 'BSIS', year: '3rd Year' },
  { id: 4, name: 'Daniel Reyes', course: 'BSIT', year: '4th Year' },
  { id: 5, name: 'Elaine Velasco', course: 'BSCS', year: '1st Year' },
];

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = studentsData.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-maroon-700">Student Directory</h1>

      <input
        type="text"
        placeholder="Search students..."
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul className="space-y-3">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <li
              key={student.id}
              className="p-4 border rounded bg-white shadow-sm hover:bg-gray-50"
            >
              <p className="text-lg font-semibold">{student.name}</p>
              <p className="text-sm text-gray-600">
                {student.course} • {student.year}
              </p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No students found.</p>
        )}
      </ul>
    </div>
  );
}

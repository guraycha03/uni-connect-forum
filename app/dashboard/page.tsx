//   Data Visualization using ApexCharts 
//  app/dashboard/page.tsx




'use client';

import { useEffect, useState } from 'react';
import { useStudentStore } from '@/store/studentStore';
import { Chart } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const students = useStudentStore((state) => state.students); // Get students from the store
  const loadStudents = useStudentStore((state) => state.loadStudents); // Load students from localStorage

  const [studentCount, setStudentCount] = useState(0);

  // Load students from localStorage when the component mounts
  useEffect(() => {
    loadStudents(); // Load students into the Zustand store from localStorage
  }, [loadStudents]);

  // Update student count whenever students change
  useEffect(() => {
    setStudentCount(students.length); // Update student count on students change
  }, [students]);

  // Chart data configuration
  const chartData = {
    labels: ['Students'],
    datasets: [
      {
        label: 'Number of Students',
        data: [studentCount], // Use the current student count
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  // Chart options configuration
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Current Student Count',
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-maroon-800 mb-6 text-center">
        📊 UniConnect Dashboard
      </h1>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Student Directory</h2>
        <ul>
          {students.length > 0 ? (
            students.map((student) => (
              <li key={student.id} className="text-lg">{student.name}</li>
            ))
          ) : (
            <li>No students added yet.</li>
          )}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Student Count Chart</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

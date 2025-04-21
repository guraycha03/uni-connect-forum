

// app/page.tsx
// app/page.tsx

'use client';

import Link from 'next/link';
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

export default function HomePage() {
  const totalUsers = 120;
  const totalPosts = 350;
  const totalComments = 540;

  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '60%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['Users', 'Posts', 'Comments'],
    },
  };

  const series = [
    {
      name: 'Total',
      data: [totalUsers, totalPosts, totalComments],
    },
  ];

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <main className="flex-grow px-6 py-10 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-[#800000]">Welcome to the Project Dashboard</h2>

        <nav className="flex gap-6 text-sm font-medium mb-8 text-[#800000]">
          <Link href="/students" className="hover:underline">Students</Link>
          <Link href="/projects" className="hover:underline">Projects</Link>
          <Link href="/reports" className="hover:underline">Reports</Link>
        </nav>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4 text-[#800000]">Dashboard Overview</h3>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={350}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

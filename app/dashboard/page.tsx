//   Data Visualization using ApexCharts 
//  app/dashboard/page.tsx




'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });


import axios from 'axios';

export default function DashboardPage() {
  const [series, setSeries] = useState<number[]>([0, 0, 0]);

  const chartOptions = {
    chart: {
      type: 'pie',
    },
    labels: ['Users', 'Posts', 'Comments'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [usersRes, postsRes, commentsRes] = await Promise.all([
          axios.get('https://jsonplaceholder.typicode.com/users'),
          axios.get('https://jsonplaceholder.typicode.com/posts'),
          axios.get('https://jsonplaceholder.typicode.com/comments'),
        ]);

        setSeries([
          usersRes.data.length,
          postsRes.data.length,
          commentsRes.data.length,
        ]);
      } catch (err) {
        console.error('Error fetching chart data', err);
      }
    };

    fetchCounts();
    const interval = setInterval(fetchCounts, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="max-w-md mx-auto">
        <ApexCharts options={chartOptions} series={series} type="pie" height={350} />
      </div>
    </div>
  );
}

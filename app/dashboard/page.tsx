//   Data Visualization using ApexCharts 
//  app/dashboard/page.tsx


'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function DashboardPage() {
  const [series, setSeries] = useState<number[] | null>(null);
  const [loading, setLoading] = useState(true);

  const chartOptions = {
    chart: {
      type: 'donut',
    },
    labels: ['Students', 'Posts', 'Comments'],
    colors: ['#b91c1c', '#2563eb', '#10b981'], // Maroon, Blue, Green
    legend: {
      position: 'bottom',
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val;
        },
      },
    },
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
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-maroon-800 mb-6 text-center">
        📊 UniConnect Dashboard
      </h1>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-300 rounded-md bg-white shadow-sm p-4">
            {loading ? (
              <p className="text-center text-gray-500">Loading chart...</p>
            ) : (
              <ApexCharts
              key={series.join('-')} // 👈 Force re-render when series updates
              options={chartOptions}
              series={series}
              type="donut"
              height={300}
              />

            )}
          </div>
        </div>

        <div className="space-y-4 text-gray-700">
          <div className="bg-red-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-red-600">👥 Students</h2>
            <p className="text-2xl">{series[0]}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-blue-600">📝 Posts</h2>
            <p className="text-2xl">{series[1]}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-green-600">💬 Comments</h2>
            <p className="text-2xl">{series[2]}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

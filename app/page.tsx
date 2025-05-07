//pThis file defines the content that will be displayed at the root of the website. This is the home page or index page.

// app/page.tsx


'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePostCommentStore } from '@/store/postCommentStore';
import axios from 'axios';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const HomePage = () => {
  const posts = usePostCommentStore((state) => state.posts);
  const users = usePostCommentStore((state) => state.users);
  const addUser = usePostCommentStore((state) => state.addUser);
  const [chartSeries, setChartSeries] = useState<number[] | null>(null);

  useEffect(() => {
    const fetchInitialUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        response.data.forEach((user) =>
          addUser({ id: user.id.toString(), name: user.name })
        );
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchInitialUsers();
  }, [addUser]);

  useEffect(() => {
    const totalUsers = users?.length || 0;
    const totalPosts = posts.length;
    const totalComments = posts.reduce((sum, post) => sum + post.comments.length, 0);

    // Avoid setting 0s at initial render
    if (totalUsers + totalPosts + totalComments > 0) {
      setChartSeries([totalUsers, totalPosts, totalComments]);
    }
  }, [users, posts]);

  const chartOptions = {
    chart: {
      type: 'radialBar',
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: { enabled: true, delay: 150 },
      },
    },
    labels: ['Total Students', 'Total Posts', 'Total Comments'],
    colors: ['#4fc3f7', '#81c784', '#ffb74d'],
    plotOptions: {
      radialBar: {
        hollow: { size: '70%' },
        dataLabels: {
          name: { show: true },
          value: {
            fontSize: '18px',
            color: '#212121',
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function (w: any) {
              return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
            },
          },
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: number) => val,
      },
    },
  };

  return (
    <main className="p-6 bg-maroon-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-maroon-900">🎓 Welcome to UniConnect</h1>

      <section className="bg-white rounded-lg shadow-md p-6 min-h-[500px]" aria-labelledby="campus-stats">
        <h2 id="campus-stats" className="text-2xl font-semibold mb-4 text-maroon-800">
          📊 Live Campus Statistics
        </h2>

        <div className="w-full max-w-md h-[400px] mx-auto border border-gray-300 rounded-md flex items-center justify-center">
          {!chartSeries ? (
            <p className="text-center text-gray-500">Loading chart...</p>
          ) : (
            <ApexCharts
              key={chartSeries.join('-')}
              options={chartOptions}
              series={chartSeries}
              type="radialBar"
              height={350}
            />
          )}
        </div>

        <ul className="mt-6 space-y-2 text-gray-700 text-lg">
          <li><strong>Total Students:</strong> {users.length}</li>
          <li><strong>Total Posts:</strong> {posts.length}</li>
          <li><strong>Total Comments:</strong> {posts.reduce((sum, post) => sum + post.comments.length, 0)}</li>
        </ul>
      </section>
    </main>
  );
};

export default HomePage;

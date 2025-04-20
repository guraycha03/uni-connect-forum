// pages/index.tsx
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    async function fetchCounts() {
      const [users, posts, comments] = await Promise.all([
        axios.get('https://jsonplaceholder.typicode.com/users'),
        axios.get('https://jsonplaceholder.typicode.com/posts'),
        axios.get('https://jsonplaceholder.typicode.com/comments'),
      ]);
      setUserCount(users.data.length);
      setPostCount(posts.data.length);
      setCommentCount(comments.data.length);
    }

    fetchCounts();
  }, []);

  const chartData = {
    options: {
      chart: { id: 'stats' },
      xaxis: {
        categories: ['Users', 'Posts', 'Comments'],
      },
    },
    series: [
      {
        name: 'Count',
        data: [userCount, postCount, commentCount],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Project Dashboard</h1>
      <div className="bg-white shadow-md p-4 rounded">
        <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
      </div>
    </div>
  );
}

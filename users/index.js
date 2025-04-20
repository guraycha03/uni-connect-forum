import { useQuery } from 'react-query';
import axios from 'axios';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Dashboard() {
  const { data: users } = useQuery('users', () => axios.get('https://jsonplaceholder.typicode.com/users').then(res => res.data));
  const { data: posts } = useQuery('posts', () => axios.get('https://jsonplaceholder.typicode.com/posts').then(res => res.data));
  const { data: comments } = useQuery('comments', () => axios.get('https://jsonplaceholder.typicode.com/comments').then(res => res.data));

  const series = [{ data: [users?.length || 0, posts?.length || 0, comments?.length || 0] }];
  const options = {
    chart: { type: 'bar' },
    xaxis: { categories: ['Users', 'Posts', 'Comments'] },
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📊 Dashboard</h1>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
}

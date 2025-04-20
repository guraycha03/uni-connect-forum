
// Dashboard.tsx



import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';

const Dashboard = () => {
  const [chartData, setChartData] = useState({
    series: [0, 0, 0],  // This will hold the data for users, posts, and comments
    options: {
      chart: {
        type: 'pie',  // You can change this to 'bar', 'line', or 'donut' if needed
        width: '100%',
      },
      labels: ['Users', 'Posts', 'Comments'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%',
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  });

  // Simulate fetching new data
  useEffect(() => {
    const fetchData = () => {
      // You can replace this with your actual API call to fetch the data
      const newUserData = 100; // Example data for users
      const newPostData = 200; // Example data for posts
      const newCommentData = 150; // Example data for comments

      // Update chart data
      setChartData({
        ...chartData,
        series: [newUserData, newPostData, newCommentData],
      });
    };

    // Call fetchData initially and set an interval to simulate periodic updates
    fetchData();
    const intervalId = setInterval(fetchData, 5000); // Updates every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [chartData]);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="dashboard-container">
        <ApexCharts options={chartData.options} series={chartData.series} type="pie" height={350} />
      </div>
    </div>
  );
};

export default Dashboard;

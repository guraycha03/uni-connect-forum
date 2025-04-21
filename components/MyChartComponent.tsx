

'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Chart component to ensure it's only loaded on the client side
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function MyChartComponent() {
  const [isClient, setIsClient] = useState(false);

  // Ensure the component only renders on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Avoid rendering the Chart component on the server
  if (!isClient) {
    return null; // Or render a loading spinner or placeholder
  }

  // Define chart options and series
  const chartOptions = {
    chart: {
      id: 'example',
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994],
    },
  };

  const chartSeries = [
    {
      name: 'Series 1',
      data: [30, 40, 35, 50],
    },
  ];

  return (
    <div className="p-4">
      <Chart options={chartOptions} series={chartSeries} type="bar" width="500" />
    </div>
  );
}

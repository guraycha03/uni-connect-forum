// components/DashboardChart.tsx
'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Student {
    id: number;
    name: string;
    course: string;
    year: string;
}

interface DashboardChartProps {
    students: Student[];
    initialPosts: number;
    initialComments: number;
}

const DashboardChart: React.FC<DashboardChartProps> = ({ students, initialPosts, initialComments }) => {
    const [chartSeries, setChartSeries] = useState<number[] | null>(null);
    const [totalPosts, setTotalPosts] = useState(initialPosts);
    const [totalComments, setTotalComments] = useState(initialComments);

    useEffect(() => {
        const totalStudents = students.length;
        setChartSeries([totalStudents, totalPosts, totalComments]);
    }, [students, totalPosts, totalComments]);

    const chartOptions = {
        chart: {
            type: 'radialBar',
            animations: {
                enabled: true,
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                }
            },
        },
        labels: ['Total Students', 'Total Posts', 'Total Comments'],
        colors: ['#4fc3f7', '#81c784', '#ffb74d'],
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '70%'
                },
                dataLabels: {
                    name: {
                        show: true
                    },
                    value: {
                        fontSize: '18px',
                        color: '#212121',
                    },
                    total: {
                        show: true,
                        label: 'Total',
                        formatter: function (w: any) {
                            return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                        }
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
    );
};

export default DashboardChart;
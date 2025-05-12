// components/DashboardChart.tsx


'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts'; // Import ApexOptions

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface DashboardChartProps {
    studentCount: number;
    initialPosts: number;
    initialComments: number;
}

const DashboardChart: React.FC<DashboardChartProps> = ({ studentCount, initialPosts, initialComments }) => {
    const [chartSeries, setChartSeries] = useState<number[] | null>(null);
    const [chartOptions, setChartOptions] = useState<ApexOptions | null>(null);

    useEffect(() => {
        setChartSeries([studentCount, initialPosts, initialComments]);

        const options: ApexOptions = {
            chart: {
                type: 'radialBar',
                animations: {
                    enabled: true,
                    speed: 800,
                    animateGradually: {
                        enabled: true,
                        delay: 150,
                    },
                },
            },
            labels: ['Total Students', 'Total Posts', 'Total Comments'],
            colors: ['#4fc3f7', '#81c784', '#ffb74d'],
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '70%',
                    },
                    dataLabels: {
                        name: {
                            show: true,
                        },
                        value: {
                            fontSize: '18px',
                            color: '#212121',
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: function (w: any) {
                                return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0).toString(); // Convert to string
                            },
                        },
                    },
                },
            },
            tooltip: {
                enabled: true,
                y: {
                    formatter: (val: number) => val.toString(), // Convert to string
                },
            },
        };
        setChartOptions(options);
    }, [studentCount, initialPosts, initialComments]);

    return (
        <div className="w-full max-w-md h-[400px] mx-auto border border-gray-300 rounded-md flex items-center justify-center">
            {!chartSeries || !chartOptions ? (
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

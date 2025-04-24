//pThis file defines the content that will be displayed at the root of the website. This is the home page or index page.

// app/page.tsx




'use client';

import React, { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration } from 'chart.js';
import 'chart.js/auto';
import Link from 'next/link';
import {
    BookOpen,
    Users,
    MessageCircle,
    Calendar,
    ChevronRight,
    MapPin,
    List,
    Facebook,
    Twitter,
    Instagram
} from 'lucide-react';

// --- MaroonButton Component Defined Here ---
const MaroonButton = ({ href, children, onClick }: { href?: string; children: React.ReactNode; onClick?: () => void }) => (
    <button
        className="bg-gradient-to-r from-maroon-500 to-maroon-700 hover:from-maroon-600 hover:to-maroon-800 text-white font-semibold py-2.5 px-5 rounded-full shadow-md transition duration-300 ease-in-out"
        onClick={onClick}
    >
        {href ? <Link href={href}>{children}</Link> : children}
    </button>
);

const ForumCard = ({ title, description }: { title: string; description: string }) => (
    <div className="bg-maroon-50 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-300">
        <h3 className="text-lg font-semibold text-maroon-600 mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
    </div>
);

const AcademicItem = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 flex items-center">
        <i className="mr-4 text-xl text-maroon-500">{icon}</i>
        <div>
            <h4 className="font-semibold text-maroon-700">{title}</h4>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    </div>
);

const CommunityCard = ({ title, description }: { title: string; description: string }) => (
    <div className="bg-purple-50 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-300">
        <h3 className="text-lg font-semibold text-purple-600 mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
    </div>
);

const ResourceLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <li><Link href={href} className="text-maroon-600 hover:text-maroon-800 transition duration-300">{children}</Link></li>
);

const HomePage = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Users', 'Posts', 'Comments'],
                    datasets: [{
                        label: 'Totals',
                        data: [54, 7, 23], // Example data
                        backgroundColor: [
                            'rgba(139, 0, 0, 0.6)',    // Maroon
                            'rgba(178, 34, 34, 0.6)',  // Firebrick
                            'rgba(128, 0, 0, 0.6)',    // DarkRed
                        ],
                        borderColor: [
                            'rgba(139, 0, 0, 1)',
                            'rgba(178, 34, 34, 1)',
                            'rgba(128, 0, 0, 1)',
                        ],
                        borderWidth: 1,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Community Statistics',
                            font: {
                                size: 16,
                            },
                            color: '#800000', // DarkRed
                        },
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: '#4a5568',
                            },
                            grid: {
                                color: '#e5e7eb',
                            },
                        },
                        x: {
                            ticks: {
                                color: '#4a5568',
                            },
                            grid: {
                                color: '#e5e7eb',
                            },
                        },
                    },
                } as ChartConfiguration,
            });
        }
    }, []);

    return (
        <main className="container mx-auto mt-8 p-4">
            <section id="home" className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-semibold text-maroon-700 mb-4">Welcome to the University Forum</h2>
                <p className="text-gray-700 mb-4">Connect with students, faculty, and staff. Explore discussions, find resources, and get involved in our community.</p>
                <div className="space-x-4">
                    <MaroonButton href="#">
                        Get Started <ChevronRight className="inline-block ml-2 w-5 h-5" />
                    </MaroonButton>
                    <MaroonButton href="/students">
                        Go to Students <Users className="inline-block ml-2 w-5 h-5" />
                    </MaroonButton>
                </div>
            </section>

            <section id="forums" className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-semibold text-maroon-700 mb-4">Featured Forums</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ForumCard title="General Discussion" description="Talk about anything and everything." />
                    <ForumCard title="Academics" description="Discussions about courses, majors, and academic life." />
                    <ForumCard title="Student Life" description="Connect on housing, events, and campus activities." />
                </div>
            </section>

            <section id="academics" className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-semibold text-maroon-700 mb-4">Academics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AcademicItem icon={<BookOpen />} title="Course Catalog" description="Explore available courses." />
                    <AcademicItem icon={<Users />} title="Degree Programs" description="Information on degree requirements." />
                    <AcademicItem icon={<Calendar />} title="Academic Calendar" description="Important dates and deadlines." />
                </div>
            </section>

            <section id="community" className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-semibold text-maroon-700 mb-4">Our Community</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CommunityCard title="Events" description="Stay updated on upcoming events." />
                    <CommunityCard title="Clubs" description="Find and join student organizations." />
                    <CommunityCard title="Volunteer" description="Opportunities to give back to the community." />
                </div>
            </section>

            <section id="resources" className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-semibold text-maroon-700 mb-4">Resources</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <ResourceLink href="#">Library</ResourceLink>
                    <ResourceLink href="#">Student Support Services</ResourceLink>
                    <ResourceLink href="#">Career Center</ResourceLink>
                    <ResourceLink href="#">IT Help Desk</ResourceLink>
                </ul>
            </section>

            <section id="chart-section" className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-semibold text-maroon-700 mb-4">Community Statistics</h2>
                <div className="chart-container">
                    <canvas ref={chartRef} width={400} height={200}></canvas>
                </div>
            </section>
        </main>
    );
};

export default HomePage;
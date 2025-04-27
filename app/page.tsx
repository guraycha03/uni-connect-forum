//pThis file defines the content that will be displayed at the root of the website. This is the home page or index page.

// app/page.tsx


// app/page.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
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

// --- MaroonButton Component ---
const MaroonButton = ({ href, children, onClick }: { href?: string; children: React.ReactNode; onClick?: () => void }) => (
    <button
        className="bg-gradient-to-r from-maroon-500 to-maroon-700 hover:from-maroon-600 hover:to-maroon-800 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out"
        onClick={onClick}
    >
        {href ? <Link href={href}>{children}</Link> : children}
    </button>
);

const ForumCard = ({ title, description }: { title: string; description: string }) => (
    <div className="bg-maroon-50 rounded-lg p-6 shadow-sm hover:shadow-md transition duration-300">
        <h3 className="text-xl font-semibold text-maroon-600 mb-3">{title}</h3>
        <p className="text-gray-700">{description}</p>
        {/* Optional: Link to the specific forum */}
        {/* <Link href={`/forums/${title.toLowerCase().replace(/ /g, '-')}`} className="text-maroon-700 hover:text-maroon-900 transition duration-300 mt-2 block text-sm">Explore Forum <ChevronRight className="inline-block ml-1 w-4 h-4" /></Link> */}
    </div>
);

const AcademicItem = ({ icon, title, description, href }: { icon: React.ReactNode; title: string; description: string; href?: string }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 flex items-center">
        <i className="mr-5 text-2xl text-maroon-500">{icon}</i>
        <div>
            <h4 className="font-semibold text-maroon-700">{title}</h4>
            <p className="text-gray-600 text-sm">{description}</p>
            {href && <Link href={href} className="text-maroon-700 hover:text-maroon-900 transition duration-300 mt-2 block text-sm">Learn More <ChevronRight className="inline-block ml-1 w-4 h-4" /></Link>}
        </div>
    </div>
);

const CommunityCard = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => (
    <div className="bg-purple-50 rounded-lg p-6 shadow-sm hover:shadow-md transition duration-300 flex items-center">
        <i className="mr-5 text-2xl text-purple-600">{icon}</i> {/* Added icon */}
        <div>
            <h3 className="text-xl font-semibold text-purple-600 mb-3">{title}</h3>
            <p className="text-gray-700">{description}</p>
            {/* Optional: Link to the community section */}
            {/* <Link href={`/community/${title.toLowerCase().replace(/ /g, '-')}`} className="text-purple-700 hover:text-purple-900 transition duration-300 mt-2 block text-sm">Explore <ChevronRight className="inline-block ml-1 w-4 h-4" /></Link> */}
        </div>
    </div>
);

const ResourceLink = ({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) => (
    <li className="py-1 flex items-center">
        <i className="mr-3 text-maroon-500">{icon}</i>
        <Link href={href} className="text-maroon-600 hover:text-maroon-800 transition duration-300">{children}</Link>
    </li>
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
                            'rgba(139, 0, 0, 0.6)',
                            'rgba(178, 34, 34, 0.6)',
                            'rgba(128, 0, 0, 0.6)',
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
                                size: 18,
                            },
                            color: '#800000',
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
                } as any, // Explicitly type 'any' to avoid ChartConfiguration issues
            });
        }
    }, []);

    return (
        <main className="container mx-auto mt-10 p-6">
            <section id="home" className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h2 className="text-3xl font-semibold text-maroon-800 mb-3">Welcome to UniConnect</h2>
                <p className="text-lg text-gray-700 mb-6">Connect with students, faculty, and staff. Share ideas, collaborate on projects, and stay connected with our vibrant campus community.</p>
                <div className="space-x-6">
                    <MaroonButton href="#">
                        Join the Community <ChevronRight className="inline-block ml-3 w-6 h-6" />
                    </MaroonButton>
                    <MaroonButton href="/students">
                        Explore Students <Users className="inline-block ml-3 w-6 h-6" />
                    </MaroonButton>
                </div>
                {/* Optional: Background Image/Illustration */}
                {/* <div className="absolute top-0 left-0 w-full h-full bg-maroon-100 opacity-10 rounded-xl"></div> */}
            </section>

            <section id="forums" className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h2 className="text-2xl font-semibold text-maroon-800 mb-5">Featured Forums</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ForumCard title="General Discussion" description="Talk about anything and everything." />
                    <ForumCard title="Academics" description="Discussions about courses, majors, and academic life." />
                    <ForumCard title="Student Life" description="Connect on housing, events, and campus activities." />
                    {/* Optional: Link to all forums */}
                    {/* <div className="mt-4"><Link href="/forums" className="text-maroon-700 hover:text-maroon-900 transition duration-300 font-semibold">See All Forums <ChevronRight className="inline-block ml-2 w-5 h-5" /></Link></div> */}
                </div>
            </section>

            <section id="academics" className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h2 className="text-2xl font-semibold text-maroon-800 mb-5">Academics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AcademicItem icon={<BookOpen />} title="Browse Course Catalog" description="Explore our extensive list of available courses." href="/courses" />
                    <AcademicItem icon={<Users />} title="Discover Degree Programs" description="Information on undergraduate and graduate degree requirements." href="/degrees" />
                    <AcademicItem icon={<Calendar />} title="View Academic Calendar" description="Important dates, deadlines, and holidays for the academic year." href="/calendar" />
                </div>
            </section>

            <section id="community" className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h2 className="text-2xl font-semibold text-maroon-800 mb-5">Our Community</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <CommunityCard icon={<Calendar />} title="Campus Events" description="Stay updated on upcoming events, workshops, and seminars." />
                    <CommunityCard icon={<List />} title="Student Clubs & Organizations" description="Find and join student organizations based on your interests." />
                    <CommunityCard icon={<Users />} title="Volunteer Opportunities" description="Give back to the community through various volunteer programs." />
                </div>
            </section>

            <section id="resources" className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h2 className="text-2xl font-semibold text-maroon-800 mb-5">Resources</h2>
                <ul className="list-disc list-inside space-y-3 text-gray-700">
                    <ResourceLink href="#" icon={<BookOpen />}>University Library</ResourceLink>
                    <ResourceLink href="#" icon={<MessageCircle />}>Student Support Services</ResourceLink>
                    <ResourceLink href="#" icon={<MapPin />}>Career Center</ResourceLink>
                    <ResourceLink href="#" icon={<List />}>IT Help Desk</ResourceLink>
                </ul>
            </section>

            {/* Chart Section - No Changes */}
            <section id="chart-section" className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h2 className="text-2xl font-semibold text-maroon-800 mb-5">Community Statistics</h2>
                <div className="chart-container">
                    <canvas ref={chartRef} width={400} height={200}></canvas>
                </div>
            </section>
        </main>
    );
};

export default HomePage;
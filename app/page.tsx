//pThis file defines the content that will be displayed at the root of the website. This is the home page or index page.

// app/page.tsx




'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    BookOpen,
    Users,
    MessageCircle,
    Calendar,
    Mail,
    Facebook,
    Twitter,
    Instagram,
    ChevronRight,
    Loader2,
    AlertTriangle,
    CheckCircle,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Placeholder logo (replace with your actual logo)
const UniConnectLogo = () => (
    <div className="text-2xl font-bold text-maroon-500">
        UniConnect
    </div>
);

// --- Homepage Components ---

// Hero Section
const HeroSection = () => (
    <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="text-center py-20 md:py-32 bg-gradient-to-br from-maroon-50/10 to-maroon-900/10" // Maroon gradient
    >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 md:mb-6">
            Connect. Collaborate. Thrive.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto">
            Your university's online hub for discussions, events, groups, and resources.
        </p>
        <Button
            variant="default"
            size="lg"
            className="bg-gradient-to-r from-maroon-500 to-maroon-700 text-white hover:from-maroon-600 hover:to-maroon-800
                       px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300" // Maroon buttons
        >
            Get Started <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
    </motion.section>
);

// Features Section
const FeatureCard = ({ title, description, icon: Icon }) => (
    <motion.div
        whileHover={{ scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10
                   hover:shadow-xl hover:border-maroon-500/20 transition-all duration-300" // Maroon hover border
    >
        <Icon className="w-8 h-8 text-maroon-400 mb-4" /> {/* Maroon icon */}
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
    </motion.div>
);

const FeaturesSection = () => {
    const features = [
        {
            title: 'Forums & Discussions',
            description: 'Engage in lively discussions on various topics related to your university and studies.',
            icon: MessageCircle,
        },
        {
            title: 'Study Groups',
            description: 'Find or create study groups to collaborate with your peers and excel in your courses.',
            icon: Users,
        },
        {
            title: 'Event Calendar',
            description: 'Stay updated with all the important events happening on campus.',
            icon: Calendar,
        },
        {
            title: 'Resource Sharing',
            description: 'Access and share valuable resources like notes, guides, and past papers.',
            icon: BookOpen,
        },
    ];

    return (
        <section className="py-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Key Features</h2>
                <p className="text-gray-300 max-w-3xl mx-auto">
                    Explore the tools and features designed to enhance your university experience.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </div>
        </section>
    );
};

// Dashboard Section
const DashboardSection = () => {
    // Dummy data for demonstration.  Labels are now USERS, POSTS, COMMENTS
    const initialDashboardData = {
        totalUsers: 150,
        totalPosts: 100,
        totalComments: 200,
    };

    const [dashboardData, setDashboardData] = useState(initialDashboardData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            // Simulate initial data load
            setDashboardData({
                totalUsers: 200,
                totalPosts: 150,
                totalComments: 250,
            });
            setLoading(false);
        }, 1500);

        const updateInterval = setInterval(() => {
            setDashboardData((prevData) => ({
                totalUsers: prevData.totalUsers + Math.floor(Math.random() * 20),
                totalPosts: prevData.totalPosts + Math.floor(Math.random() * 15),
                totalComments: prevData.totalComments + Math.floor(Math.random() * 25),
            }));
        }, 5000);

        return () => {
            clearTimeout(timer);
            clearInterval(updateInterval);
        };
    }, []);

    const chartData = [
        { name: 'USERS', value: dashboardData.totalUsers },
        { name: 'POSTS', value: dashboardData.totalPosts },
        { name: 'COMMENTS', value: dashboardData.totalComments },
    ];

    const chartColor = '#880808'; // Deep Maroon

    return (
        <section className="py-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Dashboard Overview</h2>
                <p className="text-gray-300 max-w-3xl mx-auto">
                    Track key metrics and activity on the platform.
                </p>
            </div>
            <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <div className="bg-white/5 backdrop-blur-md shadow-lg rounded-lg p-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white">Total Users</h3>
                        <p className="text-2xl font-bold text-white mt-2">
                            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : dashboardData.totalUsers}
                        </p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md shadow-lg rounded-lg p-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white">Total Posts</h3>
                        <p className="text-2xl font-bold text-white mt-2">
                            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : dashboardData.totalPosts}
                        </p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md shadow-lg rounded-lg p-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white">Total Comments</h3>
                        <p className="text-2xl font-bold text-white mt-2">
                            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : dashboardData.totalComments}
                        </p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.3 }}
                    className="bg-white/5 backdrop-blur-md shadow-lg rounded-lg p-6 border border-white/10"
                >
                    <h4 className="text-xl font-semibold text-white mb-6">Dashboard Overview</h4>
                    {loading ? (
                        <div className="text-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                            <p className="text-gray-400 mt-2">Loading chart data...</p>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={chartData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(200, 200, 200, 0.2)" />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fill: '#6b7280' }}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fill: '#6b7280' }}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', color: '#333' }}
                                    labelStyle={{ fontWeight: 'bold', color: '#333' }}
                                    itemStyle={{ color: '#333' }}
                                />
                                <Legend wrapperStyle={{ color: '#6b7280' }} />
                                <Bar dataKey="value" fill={chartColor} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

// Contact Form Section
const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        setErrorMessage('');

        // Basic validation
        if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
            setFormStatus('error');
            setErrorMessage('Please fill in all fields.');
            return;
        }

        // Email validation (basic)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setFormStatus('error');
            setErrorMessage('Invalid email address.');
            return;
        }

        // Simulate an API call (replace with your actual backend logic)
        try {
            // Simulate a delay
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // In a real app, you'd send data to a server here using fetch or axios
            // Example:
            // const response = await fetch('/api/contact', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(formData),
            // });

            // if (!response.ok) {
            //   throw new Error('Failed to send message');
            // }

            setFormStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
        } catch (error: any) {
            setFormStatus('error');
            setErrorMessage(error.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <section className="py-20 bg-gradient-to-br from-black/80 to-gray-900/90">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h2>
                <p className="text-gray-300 max-w-3xl mx-auto">
                    Have any questions or suggestions? Reach out to us!
                </p>
            </div>
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="bg-white/5 text-white border-white/10 placeholder:text-gray-400"
                        />
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            className="bg-white/5 text-white border-white/10 placeholder:text-gray-400"
                        />
                    </div>
                    <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        className="bg-white/5 text-white border-white/10 placeholder:text-gray-400"
                        />
                    <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows={6}
                        className="bg-white/5 text-white border-white/10 placeholder:text-gray-400"
                        />

                    <AnimatePresence>
                        {formStatus === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-md flex items-center gap-2"
                                >
                                <AlertTriangle className="w-5 h-5" />
                                {errorMessage}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {formStatus === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-md flex items-center gap-2"
                                >
                                <CheckCircle className="w-5 h-5" />
                                Message sent successfully!
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="w-full bg-gradient-to-r from-maroon-500 to-maroon-700 text-white hover:from-maroon-600 hover:to-maroon-800
                                  py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                                  disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center" // Maroon buttons
                        >
                        {formStatus === 'submitting' ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            'Send Message'
                        )}
                    </Button>
                </form>
            </div>
        </section>
    );
};

// --- Layout Components ---

// Header
const Header = () => (
    <header className="py-4 border-b border-white/10 backdrop-blur-md sticky top-0 z-50 bg-black/80">
        <div className="container mx-auto flex items-center justify-between">
            <UniConnectLogo />
            <nav>
                {/* Add navigation links as needed */}
                {/* Example:
                <ul className="flex space-x-6">
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Forums</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Groups</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Events</a></li>
                </ul>
                */}
            </nav>
        </div>
    </header>
);

// Footer
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-6 border-t border-white/10 bg-black/80">
            <div className="container mx-auto text-center">
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="#" className="text-gray-400 hover:text-maroon-400 transition-colors">
                        <Facebook className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-maroon-400 transition-colors">
                        <Twitter className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                        <Instagram className="w-6 h-6" />
                    </a>
                    {/* Add more social media links as needed */}
                </div>
                <p className="text-gray-400 text-sm">
                    &copy; {currentYear} UniConnect. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                    This is a student project.
                </p>
            </div>
        </footer>
    );
};

// Main App Component
const HomePage = () => {
    return (
        <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <div className="container mx-auto px-4">
                    <HeroSection />
                    <FeaturesSection />
                    <DashboardSection />
                    <ContactForm />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;

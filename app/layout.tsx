// app/layout.tsx
//      header & footer



// app/layout.tsx
//      header & footer

'use client';

import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

// Define the cn function directly in this file
const cn = (...args: any[]): string => {
    return args.filter(Boolean).join(' ');
};

// Create a new QueryClient instance
const queryClient = new QueryClient();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Check if mounted before rendering client-side components
    if (!mounted) {
        return (
            <html lang="en">
                <body className={inter.className}>
                    {/* You can render a simple loading indicator here if you want */}
                    <div className="flex justify-center items-center h-screen">
                        <p className="text-gray-700">Loading...</p>
                    </div>
                </body>
            </html>
        );
    }

    return (
        <QueryClientProvider client={queryClient}>
            <html lang="en">
                <body className={inter.className}>
                    {/* Header */}
                    <header className="bg-maroon-200 shadow-md rounded-b-lg py-4 px-4 sm:px-8 border-b-4 border-red-500">
                        <div className="flex items-center justify-between flex-wrap">
                            {/* Left Side: Logo and University Info */}
                            <div className="flex items-center flex-shrink-0 mr-4 mb-2 sm:mb-0">
                                <Link href="/" className="flex items-center hover:text-inherit">
                                    <div className="relative h-12 w-12 sm:h-16 sm:w-16 mr-3">
                                        <img
                                            src="/logo/uni-logo.png"
                                            alt="UniConnect Logo"
                                            className="rounded-full object-contain"
                                            style={{ maxHeight: '10%', maxWidth: '10%', height: 'auto', width: 'auto' }}
                                        />
                                    </div>
                                    <div className="text-white flex flex-col items-start">
                                        <h1 className="text-lg font-bold sm:text-xl">Bulan State University</h1>
                                        <p className="text-xs sm:text-sm mt-1">Online Forum</p>
                                    </div>
                                </Link>
                            </div>

                            {/* Right Side: Navigation */}
                            <nav className="flex space-x-8 flex-grow justify-center sm:justify-end">
                                <ul className="flex space-x-8">
                                    <li>
                                        <Link href="/" className="text-maroon-700 hover:text-maroon-900 transition duration-300 font-semibold">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/students" className="text-maroon-700 hover:text-maroon-900 transition duration-300 font-semibold">
                                            Student Directory
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/posts" className="text-maroon-700 hover:text-maroon-900 transition duration-300 font-semibold">
                                            Posts
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="min-h-screen bg-maroon-100 py-8 px-4 sm:px-8">
                        {children}
                    </main>

                    {/* Footer */}
                    <footer className="bg-maroon-800 text-white py-8 px-4 sm:px-8 rounded-t-lg shadow-md">
                        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Quick Links */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/" className="hover:text-maroon-200">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/students" className="hover:text-maroon-200">
                                            Student Directory
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/posts" className="hover:text-maroon-200">
                                            Forums
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="hover:text-maroon-200">
                                            Contact Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/faq" className="hover:text-maroon-200">
                                            FAQ
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact Information */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                                <p>Bulan State University</p>
                                <p>Address Line 1, Bulan, Sorsogon, Philippines</p>
                                <p>Email: uniconnect.support@bsu.edu.ph</p>
                            </div>

                            {/* Connect */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Connect</h3>
                                <div className="flex space-x-4">
                                    <Link href="#" className="hover:opacity-75">
                                        Facebook
                                    </Link>
                                    <Link href="#" className="hover:opacity-75">
                                        Twitter
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 text-center border-t border-maroon-700 pt-6">
                            <p>© {new Date().getFullYear()} UniConnect. All rights reserved.</p>
                            <p className="mt-2 text-sm">
                                <Link href="/privacy" className="hover:text-maroon-200 mr-4">
                                    Privacy Policy
                                </Link>
                                <Link href="/terms" className="hover:text-maroon-200">
                                    Terms of Service
                                </Link>
                            </p>
                        </div>
                    </footer>
                </body>
            </html>
        </QueryClientProvider>
    );
}


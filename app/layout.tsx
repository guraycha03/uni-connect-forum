// app/layout.tsx
//      header & footer

// app/layout.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
// import { Button } from '@/components/ui/button'; // Removed problematic import
import { Menu } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

// Define the cn function directly in this file
const cn = (...args: any[]): string => {
    return args.filter(Boolean).join(' ');
};

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Define a simple Button component locally to avoid the import error.  In a real app,
// you'd want to make sure this path is correct, or the component is globally available.
const Button = ({
    variant,
    size,
    onClick,
    className,
    children,
    'aria-label': ariaLabel
}: {
    variant?: string;
    size?: string;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    'aria-label'?: string;
}) => {
    const baseClasses =
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    const variantClasses = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        ghost: 'text-foreground hover:bg-accent hover:text-accent-foreground',
        outline:
            'border border-input bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
    };
    const sizeClasses = {
        default: 'px-4 py-2',
        icon: 'h-9 w-9 p-0',
    };

    const combinedClasses = cn(
        baseClasses,
        variantClasses[variant || 'default'],
        sizeClasses[size || 'default'],
        className
    );

    return (
        <button onClick={onClick} className={combinedClasses} aria-label={ariaLabel}>
            {children}
        </button>
    );
};


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

    useEffect(() => {
        setMounted(true);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Example: Consider mobile below 768px
        };

        handleResize(); // Check on initial load
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <html lang="en">
                <body className={inter.className}>
                    {/* Header */}
                    <header className="bg-maroon-200 shadow-md rounded-b-lg py-4 px-4 sm:px-8 border-b-4 border-red-500">
                        <div className="flex items-center justify-between flex-wrap">
                            {/* Left Side: Logo and Header Text */}
                            <div className="flex items-center flex-shrink-0 mr-4 mb-2 sm:mb-0">
                                <Link href="/" className="flex items-center hover:text-inherit">
                                    <div className="relative w-10 h-10 mr-3">
                                        <img
                                            src="/logo/uni-logo.png"
                                            alt="UniConnect Logo"
                                            className="rounded-full object-contain"
                                            style={{
                                                maxHeight: '100%',
                                                maxWidth: '100%',
                                                height: '112px',
                                                width: '112px',
                                            }}
                                        />
                                    </div>
                                    <div className="text-white flex flex-col items-start ml-6">
                                        <h1 className="text-lg font-bold sm:text-xl whitespace-nowrap" style={{ paddingLeft: '8px' }}>
                                            Bulan State University
                                        </h1>
                                        <p className="text-xs sm:text-sm mt-1 whitespace-nowrap" style={{ paddingLeft: '8px' }}>Online Forum</p>
                                    </div>
                                </Link>
                            </div>

                            {/* Right Side: Navigation */}
                            <div className="flex items-center">
                                {isMobile && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={toggleMenu}
                                        className="text-white hover:bg-maroon-700 mr-4"
                                        aria-label="Toggle Menu"
                                    >
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                )}
                                <nav
                                    className={cn(
                                        "flex space-x-8 flex-grow justify-center sm:justify-end transition-all duration-300",
                                        isMobile
                                            ? isMenuOpen
                                                ? "fixed top-0 right-0 h-full w-64 bg-maroon-200 bg-opacity-90 z-50 flex flex-col items-start p-6 space-y-6"
                                                : "hidden"
                                            : "flex space-x-8"
                                    )}
                                >
                                    {isMobile && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={toggleMenu}
                                            className="absolute top-4 right-4 text-white hover:bg-maroon-700"
                                            aria-label="Close Menu"
                                        >
                                            {/* Replace this with an X icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>

                                        </Button>
                                    )}
                                    <ul
                                        className={cn(
                                            "flex space-x-8",
                                            isMobile ? "flex-col items-start space-y-4" : "flex space-x-8",
                                            isMobile && "mt-16"
                                        )}
                                    >
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
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="min-h-screen bg-maroon-100 py-8 px-4 sm:px-8">
                        {children}
                    </main>

                    {/* Footer */}
                    <footer className="bg-maroon-800 text-white py-8 px-4 sm:px-8 rounded-t-lg shadow-md">
                        {/* ... footer content ... */}
                    </footer>
                </body>
            </html>
        </QueryClientProvider>
    );
}



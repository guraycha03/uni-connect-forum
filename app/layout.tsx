// app/layout.tsx
//      header & footer


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

// Define a simple Button component locally to avoid the module error.  If you have a
// more complex Button component, you should ensure it's correctly set up and exported
// in your project.
const Button = ({
    children,
    variant,
    size,
    onClick,
    className,
    ariaLabel
}: {
    children: React.ReactNode;
    variant?: 'default' | 'ghost' | 'outline' | 'secondary'; // Add more variants as needed
    size?: 'default' | 'icon';
    onClick?: () => void;
    className?: string;
    ariaLabel?: string; // Add ariaLabel prop
}) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors";
    const variantClasses = {
        default: "bg-maroon-500 text-white hover:bg-maroon-600", // Use your maroon color
        ghost: "text-white hover:bg-maroon-700/20",
        outline: "border border-maroon-500 text-maroon-500 hover:bg-maroon-500/10",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700", // Example
    };
    const sizeClasses = {
        default: "px-4 py-2",
        icon: "h-9 w-9", // Example, adjust as needed
    };

    const classes = cn(
        baseClasses,
        variantClasses[variant || 'default'],
        sizeClasses[size || 'default'],
        className
    );

    return (
        <button onClick={onClick} className={classes} aria-label={ariaLabel}>
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
                            <div className="flex items-center  flex-shrink-0  mb-2 sm:mb-0">
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
                            <div className="flex items-center flex-grow justify-center"> {/* Added flex-grow and justify-center */}
                                {isMobile && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={toggleMenu}
                                        className="text-white hover:bg-maroon-700 mr-4"
                                        ariaLabel="Toggle Menu"
                                    >
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                )}
                                <nav
                                    className={cn(
                                        "flex space-x-8 transition-all duration-300",
                                        isMobile
                                            ? isMenuOpen
                                                ? "fixed top-0 right-0 h-full w-64 bg-maroon-200 bg-opacity-90 z-50 flex flex-col items-start p-6 space-y-6"
                                                : "hidden"
                                            : "flex space-x-8"
                                    )}

                                >
                                    <ul className={cn(
                                        "flex space-x-8 items-center",
                                        isMobile ? "flex-col items-start space-y-4" : "flex space-x-8"
                                    )}
                                    >
                                        <li>
                                            <Link href="/" className="text-white hover:text-gray-200 transition duration-300 font-semibold">
                                                Home
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/students" className="text-white hover:text-gray-200 transition duration-300 font-semibold">
                                                Student Directory
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/posts" className="text-white hover:text-gray-200 transition duration-300 font-semibold">
                                                Posts
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            {isMobile && (
                                <div className="flex items-center">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={toggleMenu}
                                        className="text-white hover:bg-maroon-700 mr-4"
                                        ariaLabel="Toggle Menu"
                                    >
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                </div>
                            )}
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




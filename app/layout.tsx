// app/layout.tsx
//      header & footer


// app/layout.tsx
//     header & footer

import { Inter } from 'next/font/google';
import Link from 'next/link';
import '../styles/globals.css'; // Correct import path

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'UniConnect',
    description: 'Your Campus, Online',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <header className="bg-maroon-200 shadow-md rounded-b-lg py-12 px-6 flex items-center justify-between sticky top-0 z-50"> {/* Increased vertical padding */}
                    <div className="header-logo p-2 flex items-center">
                        <Link href="/">
                            <img
                                src="/logo/uni-logo.png"
                                alt="UniConnect Logo"
                                className="rounded-full object-contain"
                                style={{ height: '48px', width: '48px' }}
                            />
                        </Link>
                    </div>
                    <nav className="hidden md:flex space-x-8">
                        <Link href="/" className="text-maroon-700 hover:text-maroon-900 transition duration-300 font-semibold">
                            Home
                        </Link>
                        <Link href="/students" className="text-maroon-700 hover:text-maroon-900 transition duration-300 font-semibold">
                            Student Directory
                        </Link>
                        <Link href="/posts" className="text-maroon-700 hover:text-maroon-900 transition duration-300 font-semibold">
                            Posts
                        </Link>
                    </nav>
                    <div className="md:hidden">
                        {/* Mobile Menu Button */}
                        <button className="text-gray-700 focus:outline-none focus:shadow-outline">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                        {/* Mobile Menu */}
                        <div className="hidden absolute top-16 right-0 bg-maroon-100 shadow-md rounded-md p-4 z-10 w-fit">
                            <Link href="/" className="block text-maroon-700 hover:text-maroon-900 transition duration-300 py-2 font-semibold">Home</Link>
                            <Link href="/students" className="block text-maroon-700 hover:text-maroon-900 transition duration-300 py-2 font-semibold">Student Directory</Link>
                            <Link href="/posts" className="block text-maroon-700 hover:text-maroon-900 transition duration-300 py-2 font-semibold">Posts</Link>
                            {/* Add other mobile links here */}
                        </div>
                    </div>
                </header>
                <main className="font-inter min-h-screen bg-maroon-100">
                    {children}
                </main>
                <footer className="bg-maroon-800 text-white py-6 text-center rounded-t-lg shadow-md">
                    <p>© {new Date().getFullYear()} UniConnect. All rights reserved.</p>
                </footer>
            </body>
        </html>
    );
}
// app/layout.tsx
//      header & footer





'use client';

import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Header */}
        <header className="bg-maroon-200 shadow-md rounded-b-lg h-48 py-8 px-10 flex items-center justify-start border-4 border-red-500">
            {/* Logo Section */}
            <div className="header-logo p-2 flex items-center">
                <Link href="/">
                <img
                    src="/logo/uni-logo.png"
                    alt="UniConnect Logo"
                    className="rounded-full object-contain"
                    style={{ height: '100px', width: '100px' }} // Increased logo size
                />
                </Link>
            </div>

            {/* University Name and Description */}
            <div className="flex flex-col justify-center ml-4 text-white">
                <h1 className="text-2xl font-bold">Bulan State University</h1>
                <p className="text-sm mt-1">Online Forum</p>
            </div>

            {/* Navigation */}
            <nav className="flex space-x-8 ml-auto">
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
            </header>




        {/* Main Content */}
        <main className="min-h-screen bg-maroon-100">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-maroon-800 text-white py-6 text-center rounded-t-lg shadow-md">
          <p>© {new Date().getFullYear()} UniConnect. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}

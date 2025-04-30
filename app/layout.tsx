// app/layout.tsx
//      header & footer


'use client';

import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // For mobile menu icon

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Header */}
        <header className="bg-maroon-200 shadow-md rounded-b-lg py-6 px-4 sm:px-8 flex items-center justify-between border-b-4 border-red-500">
          {/* Left Side: Logo and University Info */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center hover:text-inherit">
              <div className="relative h-12 w-12 sm:h-16 sm:w-16 mr-3">
                <img
                  src="/logo/uni-logo.png"
                  alt="UniConnect Logo"
                  className="rounded-full object-contain"
                  style={{ maxHeight: '12%', maxWidth: '12%', height: 'auto', width: 'auto' }}
                />
              </div>
              <div className="text-white">
                <h1 className="text-lg font-bold sm:text-xl">Bulan State University</h1>
                <p className="text-xs sm:text-sm mt-1">Online Forum</p>
              </div>
            </Link>
          </div>

          {/* Right Side: Navigation */}
          <nav className="hidden sm:flex space-x-8"> {/* Removed ml-auto here */}
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

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </header>

        {/* Mobile Menu (Conditional rendering) */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-maroon-200 py-4 px-4 shadow-md">
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="block text-white hover:bg-maroon-300 py-2 px-3 rounded-md font-semibold">
                Home
              </Link>
              <Link href="/students" className="block text-white hover:bg-maroon-300 py-2 px-3 rounded-md font-semibold">
                Student Directory
              </Link>
              <Link href="/posts" className="block text-white hover:bg-maroon-300 py-2 px-3 rounded-md font-semibold">
                Posts
              </Link>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="min-h-screen bg-maroon-100 py-8 px-4 sm:px-8">
          {children}
        </main>

        {/* Footer */}
        {/* Footer */}
        <footer className="bg-maroon-800 text-white py-8 px-4 sm:px-8 rounded-t-lg shadow-md">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-maroon-200">Home</Link></li>
                <li><Link href="/students" className="hover:text-maroon-200">Student Directory</Link></li>
                <li><Link href="/posts" className="hover:text-maroon-200">Forums</Link></li>
                <li><Link href="/contact" className="hover:text-maroon-200">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-maroon-200">FAQ</Link></li>
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
                <Link href="#" className="hover:opacity-75">Facebook</Link>
                <Link href="#" className="hover:opacity-75">Twitter</Link>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center border-t border-maroon-700 pt-6">
            <p>© {new Date().getFullYear()} UniConnect. All rights reserved.</p>
            <p className="mt-2">
              <Link href="/privacy" className="text-sm hover:text-maroon-200 mr-4">Privacy Policy</Link>
              <Link href="/terms" className="text-sm hover:text-maroon-200">Terms of Service</Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}


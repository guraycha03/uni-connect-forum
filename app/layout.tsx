// app/layout.tsx
//      header & footer




import '../styles/globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-[90px] px-6 bg-[#800000] text-white flex items-center shadow-md text-xl font-semibold">
        ACADEMIC PORTAL
        </header>

        {/* Main content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="h-[100px] bg-[#800000] text-white text-center px-4 py-6 flex flex-col items-center justify-center text-sm">
          <p className="mb-1">2025 ©SorSU-BC Academic Portal v0.6.25</p>
          <div className="space-x-4">
            <a href="#" className="hover:underline">Service Status</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </footer>
      </body>
    </html>
  );
}

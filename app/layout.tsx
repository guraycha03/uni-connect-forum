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
          <div className="flex items-center gap-4 pl-2">
            {/* Logo - replace with <img src="/logo.png" alt="UniConnect Logo" className="h-8 w-auto" /> if you have an image */}
            <div className="bg-white text-[#800000] font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg">
              U
            </div>
            <span>UniConnect Forum</span>
          </div>
        </header>


        {/* Main content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-[#800000] text-white px-6 py-6 text-sm flex flex-col items-center justify-center space-y-2">
          <p>2025 © <strong>UniConnect Forum</strong> v0.6.25</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#" className="hover:underline transition duration-200">Terms of Use</a>
            <a href="#" className="hover:underline transition duration-200">Community Guidelines</a>
            <a href="#" className="hover:underline transition duration-200">Contact Support</a>
          </div>
        </footer>

      </body>
    </html>
  );
}

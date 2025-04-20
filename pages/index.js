// pages/index.js
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white p-6">
      <h1 className="text-4xl font-bold mb-4">🎉 Welcome to Cha's Web App 🎉</h1>
      <p className="text-lg mb-8 text-center max-w-xl">
        This is your actual project page. You can now start building a real, functional web app here using React, Tailwind CSS, and more.
      </p>

      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
        Get Started
      </button>
    </main>
  );
}

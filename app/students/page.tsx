// app/students/page.tsx
'use client';

export default function StudentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Students List</h1>

      <div className="space-y-4">
        <div className="p-4 border rounded shadow">
          <h2 className="font-semibold text-lg">Cha Guray</h2>
          <p>Email: cha@guray.com</p>
          <p>Status: Enrolled</p>
        </div>

        <div className="p-4 border rounded shadow">
          <h2 className="font-semibold text-lg">Jin Sora</h2>
          <p>Email: sora@kdramail.com</p>
          <p>Status: Graduated</p>
        </div>
      </div>
    </div>
  );
}

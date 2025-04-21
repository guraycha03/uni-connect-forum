// app/students/page.tsx

'use client';

import Link from 'next/link';

export default function StudentsPage() {
  const students = [
    {
      name: 'Cha Guray',
      email: 'cha@guray.com',
      status: 'Enrolled',
      profileImage: '/images/cha.jpg', // Image path
      id: 'cha',
    },
    {
      name: 'Jin Sora',
      email: 'sora@kdramail.com',
      status: 'Graduated',
      profileImage: '/images/sora.jpg', // Image path
      id: 'sora',
    },
    {
      name: 'Miguel R. Torres',
      studentNo: '34567890',
      course: 'BSIT',
      yearBlock: '3-1',
      status: 'Officially Enrolled',
      email: 'miguel.torres@example.com',
      address: 'Santiago, Isabela',
      id: 'miguel_torres', // Add unique id
    },
    {
      name: 'Angelica Cruz',
      studentNo: '45678901',
      course: 'BSIT',
      yearBlock: '1-2',
      status: 'Officially Enrolled',
      email: 'angelica.cruz@example.com',
      address: 'Albay, Bicol',
      id: 'angelica_cruz', // Add unique id
    },
    {
      name: 'Daniel P. Navarro',
      studentNo: '56789012',
      course: 'BSIT',
      yearBlock: '2-3',
      status: 'Leave of Absence',
      email: 'daniel.navarro@example.com',
      address: 'Taguig City',
      id: 'daniel_navarro', // Add unique id
    },
    {
      name: 'Frances L. Santos',
      studentNo: '67890123',
      course: 'BSIT',
      yearBlock: '4-1',
      status: 'Officially Enrolled',
      email: 'frances.santos@example.com',
      address: 'Cebu City',
      id: 'frances_santos', // Add unique id
    },
    {
      name: 'Mark Anthony Yu',
      studentNo: '78901234',
      course: 'BSIT',
      yearBlock: '2-2',
      status: 'Officially Enrolled',
      email: 'mark.yu@example.com',
      address: 'Naga City',
      id: 'mark_yu', // Add unique id
    },
    {
      name: 'Janine Mae Dela Cruz',
      studentNo: '89012345',
      course: 'BSIT',
      yearBlock: '3-2',
      status: 'Officially Enrolled',
      email: 'janine.dc@example.com',
      address: 'Legazpi City',
      id: 'janine_dc', // Add unique id
    },
    {
      name: 'Kevin S. Bautista',
      studentNo: '90123456',
      course: 'BSIT',
      yearBlock: '1-1',
      status: 'Dropped',
      email: 'kevin.bautista@example.com',
      address: 'Irosin, Sorsogon',
      id: 'kevin_bautista', // Add unique id
    },
    {
      name: 'Ella Grace Manalo',
      studentNo: '11223344',
      course: 'BSIT',
      yearBlock: '2-1',
      status: 'Officially Enrolled',
      email: 'ella.manalo@example.com',
      address: 'Bulusan, Sorsogon',
      id: 'ella_manalo', // Add unique id
    },
    {
      name: 'Andrew T. Salazar',
      studentNo: '22334455',
      course: 'BSIT',
      yearBlock: '3-3',
      status: 'Officially Enrolled',
      email: 'andrew.salazar@example.com',
      address: 'Sampaloc, Manila',
      id: 'andrew_salazar', // Add unique id
    },
    {
      name: 'Patricia D. Villanueva',
      studentNo: '33445566',
      course: 'BSIT',
      yearBlock: '4-2',
      status: 'Officially Enrolled',
      email: 'tricia.v@example.com',
      address: 'Quezon City',
      id: 'patricia_villanueva', // Add unique id
    },
    {
      name: 'Justin B. Reyes',
      studentNo: '44556677',
      course: 'BSIT',
      yearBlock: '2-1',
      status: 'Officially Enrolled',
      email: 'justin.reyes@example.com',
      address: 'Masbate City',
      id: 'justin_reyes', // Add unique id
    },
    {
      name: 'Rica M. Gonzales',
      studentNo: '55667788',
      course: 'BSIT',
      yearBlock: '3-1',
      status: 'Graduated',
      email: 'rica.gonzales@example.com',
      address: 'Donsol, Sorsogon',
      id: 'rica_gonzales', // Add unique id
    },
    {
      name: 'Leonardo V. Ortega',
      studentNo: '66778899',
      course: 'BSIT',
      yearBlock: '1-2',
      status: 'Officially Enrolled',
      email: 'leo.ortega@example.com',
      address: 'Juban, Sorsogon',
      id: 'leo_ortega', // Add unique id
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Students List</h1>

      <div className="space-y-4">
        {students.map((student) => (
          <Link href={`/students/${student.id}`} key={student.id}>
            <div className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer">
              <div className="flex justify-center mb-2">
                <img
                  src={student.profileImage || '/images/default.jpg'} // If no image, use a default one
                  alt={student.name}
                  className="rounded-full w-24 h-24 object-cover"
                />
              </div>
              <h2 className="font-semibold text-lg">{student.name}</h2>
              <p>Email: {student.email}</p>
              <p>Status: {student.status}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

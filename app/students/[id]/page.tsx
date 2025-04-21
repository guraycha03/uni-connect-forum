// app/students/[id]/page.tsx

// app/students/[id]/page.tsx

'use client';

import { useRouter } from 'next/router';

export default function StudentProfilePage() {
  const router = useRouter();
  const { id } = router.query;

  const students = [
    {
      id: 'cha',
      name: 'Cha Guray',
      studentNo: '12345678',
      course: 'BSIT',
      yearBlock: '2-1',
      status: 'Officially Enrolled',
      email: 'cha@guray.com',
      address: 'Inararan, Bulan, Sorsogon',
      profileImage: '/images/cha.jpeg',
    },
    {
      id: 'sora',
      name: 'Jin Sora',
      studentNo: '23456789',
      course: 'BSIT',
      yearBlock: '2-2',
      status: 'Graduated',
      email: 'sora@kdramail.com',
      address: 'Manila, Philippines',
      profileImage: '/images/sora.jpeg',
    },
    {
      id: 'miguel_torres',
      name: 'Miguel R. Torres',
      studentNo: '34567890',
      course: 'BSIT',
      yearBlock: '3-1',
      status: 'Officially Enrolled',
      email: 'miguel.torres@example.com',
      address: 'Santiago, Isabela',
      profileImage: '/images/default.jpeg',
    },
    {
      id: 'angelica_cruz',
      name: 'Angelica Cruz',
      studentNo: '45678901',
      course: 'BSIT',
      yearBlock: '1-2',
      status: 'Officially Enrolled',
      email: 'angelica.cruz@example.com',
      address: 'Albay, Bicol',
      profileImage: '/images/default.jpeg',
    },
    {
      id: 'daniel_navarro',
      name: 'Daniel P. Navarro',
      studentNo: '56789012',
      course: 'BSIT',
      yearBlock: '2-3',
      status: 'Leave of Absence',
      email: 'daniel.navarro@example.com',
      address: 'Taguig City',
      profileImage: '/images/default.jpeg',
    },
    {
      id: 'frances_santos',
      name: 'Frances L. Santos',
      studentNo: '67890123',
      course: 'BSIT',
      yearBlock: '4-1',
      status: 'Officially Enrolled',
      email: 'frances.santos@example.com',
      address: 'Cebu City',
      profileImage: '/images/default.jpeg',
    },
    {
      id: 'mark_yu',
      name: 'Mark Anthony Yu',
      studentNo: '78901234',
      course: 'BSIT',
      yearBlock: '2-2',
      status: 'Officially Enrolled',
      email: 'mark.yu@example.com',
      address: 'Naga City',
      profileImage: '/images/default.jpeg',
    },
    {
      id: 'janine_dc',
      name: 'Janine Mae Dela Cruz',
      studentNo: '89012345',
      course: 'BSIT',
      yearBlock: '3-2',
      status: 'Officially Enrolled',
      email: 'janine.dc@example.com',
      address: 'Legazpi City',
      profileImage: '/images/default.jpeg',
    },
    {
      id: 'kevin_bautista',
      name: 'Kevin S. Bautista',
      studentNo: '90123456',
      course: 'BSIT',
      yearBlock: '1-1',
      status: 'Dropped',
      email: 'kevin.bautista@example.com',
      address: 'Irosin, Sorsogon',
      profileImage: '/images/default.jpeg',
    },
    {
      id: 'ella_manalo',
      name: 'Ella Grace Manalo',
      studentNo: '11223344',
      course: 'BSIT',
      yearBlock: '2-1',
      status: 'Officially Enrolled',
      email: 'ella.manalo@example.com',
      address: 'Bulusan, Sorsogon',
      profileImage: '/images/default.jpeg',
    },
    {
      id: 'andrew_salazar',
      name: 'Andrew T. Salazar',
      studentNo: '22334455',
      course: 'BSIT',
      yearBlock: '3-3',
      status: 'Officially Enrolled',
      email: 'andrew.salazar@example.com',
      address: 'Sampaloc, Manila',
      profileImage: '/images/default.jpeg',
    },
    {
      id: 'patricia_villanueva',
      name: 'Patricia D. Villanueva',
      studentNo: '33445566',
      course: 'BSIT',
      yearBlock: '4-2',
      status: 'Officially Enrolled',
      email: 'tricia.v@example.com',
      address: 'Quezon City',
      profileImage: '/images/default.jpeg',
    },
    {
      id: 'justin_reyes',
      name: 'Justin B. Reyes',
      studentNo: '44556677',
      course: 'BSIT',
      yearBlock: '2-1',
      status: 'Officially Enrolled',
      email: 'justin.reyes@example.com',
      address: 'Masbate City',
      profileImage: '/images/default.jpeg',
    },
    {
      id: 'rica_gonzales',
      name: 'Rica M. Gonzales',
      studentNo: '55667788',
      course: 'BSIT',
      yearBlock: '3-1',
      status: 'Graduated',
      email: 'rica.gonzales@example.com',
      address: 'Donsol, Sorsogon',
      profileImage: '/images/default.jpeg',
    },
    {
      id: 'leo_ortega',
      name: 'Leonardo V. Ortega',
      studentNo: '66778899',
      course: 'BSIT',
      yearBlock: '1-2',
      status: 'Officially Enrolled',
      email: 'leo.ortega@example.com',
      address: 'Juban, Sorsogon',
      profileImage: '/images/default.jpeg',
    },
  ];

  const student = students.find((student) => student.id === id);

  if (!student) {
    return <p>Student not found</p>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-center mb-4">
        <img
          src={student.profileImage}
          alt={`${student.name}'s profile`}
          className="w-32 h-32 rounded-full border-2 border-gray-300"
        />
      </div>
      <h1 className="text-3xl font-bold mb-2">{student.name}</h1>
      <p className="text-lg">Email: {student.email}</p>
      <p className="text-lg">Status: {student.status}</p>
      <p className="text-lg">Student No: {student.studentNo}</p>
      <p className="text-lg">Course: {student.course}</p>
      <p className="text-lg">Year/Block: {student.yearBlock}</p>
      <p className="text-lg">Address: {student.address}</p>
    </div>
  );
}

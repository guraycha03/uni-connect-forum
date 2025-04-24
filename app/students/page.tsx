// app/students/page.tsx
// student directory page





'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

// Define the cn utility function directly within this component
const cn = (...args: any[]) => {
  return args.filter(Boolean).join(' ');
};

const studentCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  hover: { scale: 1.03, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', transition: { duration: 0.2 } },
};

export default function StudentsPage() {
  const students = [
    {
      id: 'cha',
      name: 'Charisse Guray',
      email: 'cha@guray.com',
      status: 'Enrolled',
      profileImage: '/images/cha.jpeg',
      studentNo: '12345678',
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

  return (
    <main className="min-h-screen px-4 py-10 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[var(--primary)] mb-10">
          Student Directory
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {students.map((student) => (
            <Link href={`/students/${student.id}`} key={student.id} passHref>
              <motion.div
                variants={studentCardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="group"
              >
                <div className="border border-[var(--border)] bg-white dark:bg-[var(--accent)] shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer rounded-lg">
                  <div className="p-6">
                    <div className="flex flex-col items-center gap-4 mb-4">
                      {/* Avatar */}
                      <div className="student-image-container">
                        <img
                          src={student.profileImage || '/images/default.jpeg'}
                          alt={`Profile of ${student.name}`}
                          className="student-image"
                        />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] text-center">
                          {student.name}
                        </h2>
                        <p className="text-sm text-[var(--secondary)] text-center">
                          {student.email}
                        </p>
                      </div>
                    </div>
                    {/* Badge */}
                    <div className={cn(
                      "w-full text-center py-2 rounded-md mb-2",
                      (student.status === 'Enrolled' || student.status === 'Officially Enrolled' || student.status === 'Active')
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                        : student.status === 'Leave of Absence'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                          : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                    )}>
                      {student.status}
                    </div>
                    {student.studentNo && (
                      <p className="text-sm text-gray-500 text-center student-id">
                        ID: {student.studentNo}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}


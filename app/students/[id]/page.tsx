

// student profile page





'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Mapbox GL and Geocoding (using CDN, as per your setup)
// Make sure these are loaded in your main layout or _document.js
// via script tags, as you're not using npm imports.
// import mapboxgl from 'mapbox-gl'; // Not used with CDN
// import MapboxGeocoder from '@mapbox/mapbox-sdk/services/geocoding'; // Not used with CDN

// ===============================
// Constants
// ===============================

const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN'; // Replace with your actual Mapbox token
const DEFAULT_LATITUDE = 37.7749; // San Francisco
const DEFAULT_LONGITUDE = -122.4194;

// ===============================
// Types & Interfaces
// ===============================

interface Student {
  id: string;
  name: string;
  studentNo: string;
  course: string;
  yearBlock: string;
  status: string;
  email: string;
  address: string;
  profileImage: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// ===============================
// Helper Functions
// ===============================

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger the appearance of children
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

/**
 * Displays a Mapbox map centered on the given coordinates.
 */
const MapComponent: React.FC<{ latitude: number; longitude: number; address: string }> = ({ latitude, longitude, address }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null); // Use the global mapboxgl

  useEffect(() => {
    if (!MAPBOX_TOKEN) {
      console.error('Mapbox token is not set!');
      return;
    }

    if (mapRef.current) return; // Map instance already exists

    // Initialize map
    try {
      const map = new mapboxgl.Map({ // Changed to const map
        container: mapContainerRef.current!,
        style: 'mapbox://styles/mapbox/streets-v11', // Or any other style
        center: [longitude, latitude],
        zoom: 12,
        accessToken: MAPBOX_TOKEN, // Pass the token here,
      });
      mapRef.current = map;

      // Add a marker at the address
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<p>${address}</p>`)) // Add popup
        .addTo(map);

      // Cleanup
      return () => {
        if (mapRef.current) {
          mapRef.current.destroy();
          mapRef.current = null;
        }
      };
    } catch (error){
      console.error("Failed to initialize Mapbox", error);
      return;
    }
  }, [latitude, longitude, address]); // Rerun effect when lat/lng/address change

  return (
    <div className="w-full h-[300px] rounded-lg shadow-lg" ref={mapContainerRef} />
  );
};

/**
 * Displays a single student's profile information.
 */
const StudentProfilePage: React.FC = () => {
  const { id } = useParams();

  const students: Student[] = [
    {
      id: 'cha',
      name: 'Charisse G. Guray',
      studentNo: '12345678',
      course: 'BSIT',
      yearBlock: '2-1',
      status: 'Officially Enrolled',
      email: 'guraycha@gmail.com',
      address: 'Inararan, Bulan, Sorsogon',
      profileImage: '/images/cha.jpeg',
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

  const student = students.find((s) => s.id === id);

  if (!student) {
    return <p className="text-center mt-10 text-red-500">Student not found</p>;
  }

  // Geocode the student's address using Mapbox Geocoding API (using fetch)
  const [geocodeData, setGeocodeData] = useState<{ latitude: number; longitude: number } | null>(null);
  const [studentPosts, setStudentPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState<string | null>(null);


  useEffect(() => {
    const geocodeAddress = async (address: string) => {
      if (!MAPBOX_TOKEN) {
        console.error('Mapbox token is not set!');
        setGeocodeData(null); // Ensure geocodeData is set to null to prevent map from rendering
        return;
      }
      const encodedAddress = encodeURIComponent(address);
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${MAPBOX_TOKEN}`;

      try {
        const response = await fetch(url);
        if (!response.ok) { // added error check
          throw new Error(`Failed to geocode address: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const [longitude, latitude] = data.features[0].center;
          setGeocodeData({ latitude, longitude });
        } else {
          console.error('Address not found on Mapbox');
          setGeocodeData(null); // set null, so the map doesn't render with default coords.
        }
      } catch (error) {
        console.error('Error geocoding address:', error);
        setGeocodeData(null);   //set null on error
      }
    };

    geocodeAddress(student.address);
  }, [student.address]);

  // Fetch posts for the selected student
  useEffect(() => {
    const fetchStudentPosts = async () => {
      setLoadingPosts(true);
      setPostsError(null);
      try {
        // Simulate a random number of posts (0-5) for each student.
        const numberOfPosts = Math.floor(Math.random() * 6);
        let fetchedPosts: Post[] = [];

        if (numberOfPosts > 0) {
          // Fetch posts only if numberOfPosts is greater than 0
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${student.id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch posts for student ${student.id}`);
          }
          const data: Post[] = await response.json();
          fetchedPosts = data.slice(0, numberOfPosts); // Get only the required number of posts
        }
        setStudentPosts(fetchedPosts);
      } catch (error: any) {
        setPostsError(error.message);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchStudentPosts();
  }, [student.id]);

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-10 student-profile-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="student-profile-header">
        <motion.img
          src={student.profileImage}
          alt={`${student.name}'s profile`}
          className="student-profile-image-large"
          variants={itemVariants}
        />
        <motion.h1 className="student-profile-name" style={{ marginTop: '1rem' }} variants={itemVariants}>
          {student.name}
        </motion.h1>
      </div>

      <div className="mt-8 student-profile-info">
        <motion.div variants={itemVariants}>
          <strong className="block text-sm text-gray-500">Student No.</strong>
          <span className="text-lg">{student.studentNo}</span>
        </motion.div>

        <motion.div variants={itemVariants}>
          <strong className="block text-sm text-gray-500">Course</strong>
          <span className="text-lg">{student.course}</span>
        </motion.div>

        <motion.div variants={itemVariants}>
          <strong className="block text-sm text-gray-500">Year & Block</strong>
          <span className="text-lg">{student.yearBlock}</span>
        </motion.div>

        <motion.div variants={itemVariants}>
          <strong className="block text-sm text-gray-500">Status</strong>
          <span className="text-lg">{student.status}</span>
        </motion.div>

        <motion.div variants={itemVariants}>
          <strong className="block text-sm text-gray-500">Email</strong>
          <span className="text-lg">{student.email}</span>
        </motion.div>

        <motion.div variants={itemVariants}>
          <strong className="block text-sm text-gray-500">Address</strong>
          <span className="text-lg">{student.address}</span>
        </motion.div>
      </div>

      <motion.div className="mt-8" variants={itemVariants}>
        <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">Student Location</h2>
        {geocodeData && (
          <MapComponent
            latitude={geocodeData.latitude}
            longitude={geocodeData.longitude}
            address={student.address}
          />
        )}
        {!geocodeData && (
          <p className='text-red-500'>Could not retrieve location for the address.</p>
        )}
      </motion.div>

      {/* Display Student Posts */}
      <motion.div className="mt-8" variants={itemVariants}>
        <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">Student Posts</h2>
        {loadingPosts ? (
          <p className="text-gray-500">Loading posts...</p>
        ) : postsError ? (
          <p className="text-red-500">Error: {postsError}</p>
        ) : studentPosts.length > 0 ? (
          <AnimatePresence>
            {studentPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="mb-4 p-4 bg-[var(--accent)] rounded-lg shadow-md"
              >
                <h3 className="text-lg font-semibold text-[var(--foreground)]">{post.title}</h3>
                <p className="text-sm text-[var(--secondary)]">
                  {post.body}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <p className="text-gray-500">No posts found for this student.</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default StudentProfilePage;




// student profile page





// student profile page

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// ===============================
// Constants
// ===============================

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your actual Google Maps API key
const DEFAULT_LATITUDE = 14.5995; // Manila, Philippines (as per your location)
const DEFAULT_LONGITUDE = 120.9842;

// ===============================
// Types & Interfaces
// ===============================

interface Student {
    id: string;
    name: string;
    studentNo: string;
    course: string;
    yearBlock: string;
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
 * Displays a Google Map centered on the given coordinates.
 */
const GoogleMapComponent: React.FC<{ latitude: number; longitude: number; address: string }> = ({ latitude, longitude, address }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<google.maps.Map | null>(null); // Use the global google.maps

    useEffect(() => {
        if (!GOOGLE_MAPS_API_KEY) {
            console.error('Google Maps API key is not set!');
            return;
        }

        const loadGoogleMaps = () => {
            if (typeof window !== 'undefined' && !window.google) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
                script.async = true;
                script.defer = true;
                document.head.appendChild(script);
                script.onload = () => {
                    initMap();
                };
            } else {
                initMap();
            }
        };

        const initMap = () => {
            if (mapRef.current || !mapContainerRef.current || !window.google) return;

            try {
                const map = new window.google.maps.Map(mapContainerRef.current, {
                    center: { lat: latitude, lng: longitude },
                    zoom: 12,
                });
                mapRef.current = map;

                new window.google.maps.Marker({
                    position: { lat: latitude, lng: longitude },
                    map: map,
                    title: address,
                });

                const infowindow = new window.google.maps.InfoWindow({
                    content: `<p>${address}</p>`,
                });

                new window.google.maps.Marker({
                    position: { lat: latitude, lng: longitude },
                    map,
                    title: address,
                }).addListener('click', () => {
                    infowindow.open(map);
                });

            } catch (error) {
                console.error("Failed to initialize Google Maps", error);
            }
        };

        loadGoogleMaps();

        return () => {
            // Cleanup if needed
        };
    }, [latitude, longitude, address]);

    return (
        <div className="w-full h-[300px] rounded-lg shadow-lg" ref={mapContainerRef} />
    );
};

/**
 * Displays a single student's profile information.
 */
const StudentProfilePage: React.FC = () => {
    const { id } = useParams();

    //  Use the initialStudents data directly.  No need to duplicate.
    const initialStudents: Student[] = [
        {
            id: "charisse_guray_0",
            name: "Charisse Guray",
            studentNo: "20230000",
            course: "BSIT",
            yearBlock: "2-1",
            email: "charisse.guray@example.com",
            address: "Bulan, Sorsogon",
            profileImage: "/images/students/cha.gif",
        },
        {
            id: "miguel_torres_1",
            name: "Miguel Torres",
            studentNo: "20230001",
            course: "BSIS",
            yearBlock: "2-2",
            email: "miguel.torres@example.com",
            address: "Santiago, Isabela",
            profileImage: "/images/students/student_ (2).jpeg",
        },
        {
            id: "angelica_cruz_2",
            name: "Angelica Cruz",
            studentNo: "20230002",
            course: "BSCS",
            yearBlock: "3-1",
            email: "angelica.cruz@example.com",
            address: "Albay, Bicol",
            profileImage: "/images/students/student_ (3).jpeg",
        },
    const student = initialStudents.find((s) => s.id === id);

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
                setGeocodeData(null);    //set null on error
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
                    className="student-profile-image-small" // Changed to the new class
                    variants={itemVariants}
                />
                <motion.h1 className="student-profile-name"  variants={itemVariants}>
                    {student.name}
                </motion.h1>
            </div>

            <div className="student-profile-info">
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
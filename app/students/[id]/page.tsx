

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
        } catch (error) {
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

    //  Use the initialStudents data directly.  No need to duplicate.
    const initialStudents: Student[] = [
        {
            id: "charisse_guray_0",
            name: "Charisse Guray",
            studentNo: "20230000",
            course: "BSIT",
            yearBlock: "1-1",
            email: "charisse.guray@example.com",
            address: "Bulan, Sorsogon",
            profileImage: "/images/students/student_ (1).jpeg",
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
        {
            id: "daniel_navarro_3",
            name: "Daniel Navarro",
            studentNo: "20230003",
            course: "BSA",
            yearBlock: "4-2",
            email: "daniel.navarro@example.com",
            address: "Taguig City",
            profileImage: "/images/students/student_ (4).jpeg",
        },
        {
            id: "frances_santos_4",
            name: "Frances Santos",
            studentNo: "20230004",
            course: "BSAIS",
            yearBlock: "1-3",
            email: "frances.santos@example.com",
            address: "Cebu City",
            profileImage: "/images/students/student_ (5).jpeg",
        },
        {
            id: "mark_yu_5",
            name: "Mark Yu",
            studentNo: "20230005",
            course: "BPA",
            yearBlock: "2-1",
            email: "mark.yu@example.com",
            address: "Naga City",
            profileImage: "/images/students/student_ (6).jpeg",
        },
        {
            id: "janine_dela_cruz_6",
            name: "Janine Dela Cruz",
            studentNo: "20230006",
            course: "BSE",
            yearBlock: "3-2",
            email: "janine.delacruz@example.com",
            address: "Legazpi City",
            profileImage: "/images/students/student_ (7).jpeg",
        },
        {
            id: "kevin_bautista_7",
            name: "Kevin Bautista",
            studentNo: "20230007",
            course: "BTVTED",
            yearBlock: "4-1",
            email: "kevin.bautista@example.com",
            address: "Irosin, Sorsogon",
            profileImage: "/images/students/student_ (8).jpeg",
        },
        {
            id: "ella_manalo_8",
            name: "Ella Manalo",
            studentNo: "20230008",
            course: "BSIT",
            yearBlock: "1-2",
            email: "ella.manalo@example.com",
            address: "Bulusan, Sorsogon",
            profileImage: "/images/students/student_ (9).jpeg",
        },
        {
            id: "andrew_salazar_9",
            name: "Andrew Salazar",
            studentNo: "20230009",
            course: "BSIS",
            yearBlock: "2-3",
            email: "andrew.salazar@example.com",
            address: "Sampaloc, Manila",
            profileImage: "/images/students/student_ (10).jpeg",
        },
        {
            id: "patricia_villanueva_10",
            name: "Patricia Villanueva",
            studentNo: "20230010",
            course: "BSCS",
            yearBlock: "3-1",
            email: "patricia.villanueva@example.com",
            address: "Quezon City",
            profileImage: "/images/students/student_ (11).jpeg",
        },
        {
            id: "justin_reyes_11",
            name: "Justin Reyes",
            studentNo: "20230011",
            course: "BSA",
            yearBlock: "4-2",
            email: "justin.reyes@example.com",
            address: "Masbate City",
            profileImage: "/images/students/student_ (12).jpeg",
        },
        {
            id: "rica_gonzales_12",
            name: "Rica Gonzales",
            studentNo: "20230012",
            course: "BSAIS",
            yearBlock: "1-1",
            email: "rica.gonzales@example.com",
            address: "Donsol, Sorsogon",
            profileImage: "/images/students/student_ (13).jpeg",
        },
        {
            id: "leonardo_ortega_13",
            name: "Leonardo Ortega",
            studentNo: "20230013",
            course: "BPA",
            yearBlock: "2-2",
            email: "leonardo.ortega@example.com",
            address: "Juban, Sorsogon",
            profileImage: "/images/students/student_ (14).jpeg",
        },
        {
            id: "luisa_mendoza_14",
            name: "Luisa Mendoza",
            studentNo: "20230014",
            course: "BSE",
            yearBlock: "3-2",
            email: "luisa.mendoza@example.com",
            address: "Bacolod City",
            profileImage: "/images/students/student_ (15).jpeg",
        },
        {
            id: "ronald_de_la_cruz_15",
            name: "Ronald De La Cruz",
            studentNo: "20230015",
            course: "BTVTED",
            yearBlock: "4-1",
            email: "ronald.delacruz@example.com",
            address: "Calamba, Laguna",
            profileImage: "/images/students/student_ (16).jpeg",
        },
        {
            id: "mariel_soriano_16",
            name: "Mariel Soriano",
            studentNo: "20230016",
            course: "BSIT",
            yearBlock: "1-3",
            email: "mariel.soriano@example.com",
            address: "Tuguegarao City",
            profileImage: "/images/students/student_ (17).jpeg",
        },
        {
            id: "joseph_galang_17",
            name: "Joseph Galang",
            studentNo: "20230017",
            course: "BSIS",
            yearBlock: "2-1",
            email: "joseph.galang@example.com",
            address: "Angeles City",
            profileImage: "/images/students/student_ (18).jpeg",
        },
        {
            id: "bea_quijano_18",
            name: "Bea Quijano",
            studentNo: "20230018",
            course: "BSCS",
            yearBlock: "3-2",
            email: "bea.quijano@example.com",
            address: "Puerto Princesa",
            profileImage: "/images/students/student_ (19).jpeg",
        },
        {
            id: "ryan_lopez_19",
            name: "Ryan Lopez",
            studentNo: "20230019",
            course: "BSA",
            yearBlock: "4-1",
            email: "ryan.lopez@example.com",
            address: "Baguio City",
            profileImage: "/images/students/student_ (20).jpeg",
        },
        {
            id: "katrina_valdez_20",
            name: "Katrina Valdez",
            studentNo: "20230020",
            course: "BSAIS",
            yearBlock: "1-2",
            email: "katrina.valdez@example.com",
            address: "San Pablo City",
            profileImage: "/images/students/student_ (21).jpeg",
        },
        {
            id: "enzo_ramos_21",
            name: "Enzo Ramos",
            studentNo: "20230021",
            course: "BPA",
            yearBlock: "2-3",
            email: "enzo.ramos@example.com",
            address: "Tarlac City",
            profileImage: "/images/students/student_ (22).jpeg",
        },
        {
            id: "charmaine_garcia_22",
            name: "Charmaine Garcia",
            studentNo: "20230022",
            course: "BSE",
            yearBlock: "3-1",
            email: "charmaine.garcia@example.com",
            address: "Iloilo City",
            profileImage: "/images/students/student_ (23).jpeg",
        },
        {
            id: "daryl_morales_23",
            name: "Daryl Morales",
            studentNo: "20230023",
            course: "BTVTED",
            yearBlock: "4-2",
            email: "daryl.morales@example.com",
            address: "Roxas City",
            profileImage: "/images/students/student_ (24).jpeg",
        },
        {
            id: "sophia_smith_24",
            name: "Sophia Smith",
            studentNo: "20230024",
            course: "BSIT",
            yearBlock: "1-1",
            email: "sophia.smith@example.com",
            address: "Pasay City",
            profileImage: "/images/students/student_ (25).jpeg",
        },
        {
            id: "ethan_johnson_25",
            name: "Ethan Johnson",
            studentNo: "20230025",
            course: "BSIS",
            yearBlock: "2-2",
            email: "ethan.johnson@example.com",
            address: "Makati City",
            profileImage: "/images/students/student_ (26).jpeg",
        },
        {
            id: "olivia_williams_26",
            name: "Olivia Williams",
            studentNo: "20230026",
            course: "BSCS",
            yearBlock: "3-1",
            email: "olivia.williams@example.com",
            address: "Mandaluyong City",
            profileImage: "/images/students/student_ (27).jpeg",
        },
        {
            id: "noah_brown_27",
            name: "Noah Brown",
            studentNo: "20230027",
            course: "BSA",
            yearBlock: "4-2",
            email: "noah.brown@example.com",
            address: "San Juan City",
            profileImage: "/images/students/student_ (28).jpeg",
        },
        {
            id: "ava_jones_28",
            name: "Ava Jones",
            studentNo: "20230028",
            course: "BSAIS",
            yearBlock: "1-3",
            email: "ava.jones@example.com",
            address: "Las Pinas City",
            profileImage: "/images/students/student_ (29).jpeg",
        },
        {
            id: "william_garcia_29",
            name: "William Garcia",
            studentNo: "20230029",
            course: "BPA",
            yearBlock: "2-1",
            email: "william.garcia@example.com",
            address: "Paranaque City",
            profileImage: "/images/students/student_ (30).jpeg",
        },
        {
            id: "isabella_miller_30",
            name: "Isabella Miller",
            studentNo: "20230030",
            course: "BSE",
            yearBlock: "3-2",
            email: "isabella.miller@example.com",
            address: "Muntinlupa City",
            profileImage: "/images/students/student_ (31).jpeg"
        },
        {
            id: "james_davis_31",
            name: "James Davis",
            studentNo: "20230031",
            course: "BTVTED",
            yearBlock: "4-1",
            email: "james.davis@example.com",
            address: "Valenzuela City",
            profileImage: "/images/students/student_ (32).jpeg"
        },
        {
            id: "mia_rodriguez_32",
            name: "Mia Rodriguez",
            studentNo: "20230032",
            course: "BSIT",
            yearBlock: "1-2",
            email: "mia.rodriguez@example.com",
            address: "Caloocan City",
            profileImage: "/images/students/student_ (33).jpeg"
        },
        {
            id: "benjamin_martinez_33",
            name: "Benjamin Martinez",
            studentNo: "20230033",
            course: "BSIS",
            yearBlock: "2-3",
            email: "benjamin.martinez@example.com",
            address: "Navotas City",
            profileImage: "/images/students/student_ (34).jpeg"
        },
        {
            id: "charlotte_34",
            name: "Charlotte",
            studentNo: "20230034",
            course: "BSCS",
            yearBlock: "3-1",
            email: "charlotte@example.com",
            address: "Bulan, Sorsogon",
            profileImage: "/images/students/student_ (35).jpeg",
        }
    ];

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
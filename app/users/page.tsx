// This file defines the content that will be displayed at the /users URL. This is a separate page specifically for displaying a list of users (/users).


// app/users/page.tsx
// USERS LIST PAGE


'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface User {
  id: string;
  name: string;
  email: string;
  role: string; // Added role (e.g., student, instructor)
  profileImage: string;
  major?: string; // Added major, optional
  year?: string;  //Added year, optional
}

const UsersPage = () => {
  // Dummy user data for the University Online Forum
  const users: User[] = [
    {
      id: 'user1',
      name: 'Alice Smith',
      email: 'alice.smith@example.edu',
      role: 'Student',
      profileImage: 'https://source.unsplash.com/random/100x100/?woman,face,1',
      major: 'Computer Science',
      year: 'Senior',
    },
    {
      id: 'user2',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.edu',
      role: 'Instructor',
      profileImage: 'https://source.unsplash.com/random/100x100/?man,face,2',
      major: 'Mathematics',
    },
    {
      id: 'user3',
      name: 'Charlie Brown',
      email: 'charlie.brown@example.edu',
      role: 'Student',
      profileImage: 'https://source.unsplash.com/random/100x100/?man,face,3',
      major: 'Engineering',
      year: 'Freshman',
    },
    {
      id: 'user4',
      name: 'Diana Miller',
      email: 'diana.miller@example.edu',
      role: 'Student',
      profileImage: 'https://source.unsplash.com/random/100x100/?woman,face,4',
      major: 'Biology',
      year: 'Junior',
    },
    {
        id: 'user5',
        name: 'Ethan Davis',
        email: 'ethan.davis@example.edu',
        role: 'Instructor',
        profileImage: 'https://source.unsplash.com/random/100x100/?man,face,5',
        major: 'Physics',
    },
    {
        id: 'user6',
        name: 'Fiona Green',
        email: 'fiona.green@example.edu',
        role: 'Student',
        profileImage: 'https://source.unsplash.com/random/100x100/?woman,face,6',
        major: 'History',
        year: 'Sophomore'
    },
    {
        id: 'user7',
        name: 'George White',
        email: 'george.white@example.edu',
        role: 'Student',
        profileImage: 'https://source.unsplash.com/random/100x100/?man,face,7',
        major: 'Chemistry',
        year: 'Senior'
    },
    {
        id: 'user8',
        name: 'Hannah Black',
        email: 'hannah.black@example.edu',
        role: 'Instructor',
        profileImage: 'https://source.unsplash.com/random/100x100/?woman,face,8',
        major: 'Literature'
    },
  ];

  return (
    <main className="min-h-screen px-4 py-10 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
          Forum Users
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user) => (
            <Link href={`/users/${user.id}`} key={user.id} passHref>
              <motion.div
                variants={userCardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="group"
              >
                <Card className="transition-all duration-300 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg">
                  <CardHeader className="flex flex-col items-center gap-4">
                    {/* Avatar */}
                    <Avatar className="w-24 h-24">
                      <AvatarImage
                        src={user.profileImage}
                        alt={`Profile of ${user.name}`}
                        className="rounded-full border-2 border-gray-300 dark:border-gray-700"
                      />
                      <AvatarFallback className="bg-gray-400 dark:bg-gray-600 text-white font-semibold rounded-full text-2xl">
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {user.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    {/* Role Badge */}
                    <Badge
                        variant="secondary"
                        className={cn(
                            "mb-4 px-3 py-1 rounded-full text-xs font-semibold",
                            user.role === 'Student'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                                : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                        )}
                    >
                        {user.role}
                    </Badge>
                    {user.major && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Major: {user.major}
                        </p>
                    )}
                    {user.year && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Year: {user.year}
                        </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default UsersPage;

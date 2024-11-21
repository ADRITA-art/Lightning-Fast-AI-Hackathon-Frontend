// app/page.tsx

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import React from 'react';
import Button from '@/Components/Button';
import { FaCrown } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LandingPage: React.FC = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/dashboard');
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="w-full p-4 md:p-6 flex justify-between items-center bg-white shadow-md z-20">
        <h1 className="text-xl md:text-2xl font-bold text-blue-800">Prepify</h1>
        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button className="text-blue-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <ul className="hidden md:flex space-x-6 lg:space-x-8 text-base md:text-lg">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">Prepare</li>
          <li className="hover:text-blue-600 cursor-pointer flex items-center space-x-2">
          <Link href="/questions">
      <span>Interview</span>
    </Link>
            <FaCrown className="text-yellow-500" />
          </li>
          <li className="hover:text-blue-600 cursor-pointer">About Us</li>
          <li className="hover:text-blue-600 cursor-pointer">Contact</li>
        </ul>
        <div className="hidden md:flex space-x-4">
          <Link href="/signin">
            <button className="text-blue-800 hover:underline">Sign In</button>
          </Link>
          <Link href="/signup">
            <button className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex flex-col md:flex-row items-center justify-between px-6 md:px-20 space-y-8 md:space-y-0">
        {/* Text Content */}
        <motion.div
          className="text-center md:text-left space-y-4 md:space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold leading-snug">
            Prepare <span className="text-blue-600">Smartly</span> <br />
            with <span className="text-blue-600">Prepify</span>!
          </h2>
          <p className="text-gray-600">
            Whether it is for your <strong>college exams</strong> or your{" "}
            <strong>dream job</strong>, Prepify offers the best tools and
            courses to help you succeed. Learn anytime, anywhere with ease!
          </p>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
            <Button text="Get Started" onClick={handleClick} />
            <motion.button
              className="flex items-center space-x-2 text-blue-800 hover:underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>See how it works?</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Image Content */}
        <motion.div
          className="relative flex justify-center md:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="https://i.postimg.cc/Y0FMP3mK/Vector-2.png"
            alt="Yellow Vector"
            width={300}
            height={300}
            className="absolute -top-10 -left-10 z-[0] hidden md:block"
          />
          <Image
            src="https://i.postimg.cc/ZqqZmZyL/smiling-happy-indian-student-with-backpack-pointing-his-finger-wall-1.png"
            alt="Student Image"
            width={300}
            height={300}
            className="relative z-10"
          />
        </motion.div>
      </div>

      {/* Bottom Decorative Vector */}
      <div className="absolute bottom-10 left-4 md:left-10 hidden md:block">
        <Image
          src="https://i.postimg.cc/63JXvZmM/Vector-5.png"
          alt="Decorative Vector"
          width={60}
          height={60}
        />
      </div>
    </div>
  );
};

export default LandingPage;

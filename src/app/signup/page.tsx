'use client';

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignUp: React.FC = () => {
  const { setToken } = useContext(AuthContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post(
        'https://prepify-revamp.onrender.com/api/auth/signup',
        formData
      );
      if (response.data.token) {
        setToken(response.data.token);
        router.push('/dashboard');
      }
    } catch {
      setError('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-8">
      <form
        onSubmit={handleSignUp}
        className="bg-white p-6 sm:p-8 rounded shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4 sm:mb-6 text-center text-blue-800">
          Sign Up
        </h2>
        {error && (
          <p className="text-red-500 mb-4 text-center">{error}</p>
        )}
        <div className="mb-4">
          <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          {loading ? 'Registering...' : 'Sign Up'}
        </button>
        <p className="mt-4 text-center text-sm sm:text-base">
          Already have an account?{' '}
          <Link href="/signin" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;

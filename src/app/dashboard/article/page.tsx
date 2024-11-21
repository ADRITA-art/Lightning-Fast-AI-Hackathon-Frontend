'use client';

import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/ui/Articles.module.css';
import { ArrowRight } from 'lucide-react';
import axiosInstance from '@/utils/axiosInstance';
import { AuthContext } from '@/context/AuthContext';
import { FiBook } from 'react-icons/fi';
import CustomModal from '@/Components/CustomModal';

interface Article {
  _id: string;
  topic: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function Articles() {
  const { token } = useContext(AuthContext);
  const [topic, setTopic] = useState<string>('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchUserArticles = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const response = await axiosInstance.get('https://prepify-revamp.onrender.com/api/articles/articlesgen');
        setArticles(response.data.articles);
      } catch {
        setError('Failed to fetch articles.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserArticles();
  }, [token]);

  const handleGenerateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a topic.');
      return;
    }

    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const response = await axiosInstance.post('https://prepify-revamp.onrender.com/api/articles/articlesgen', { topic });
      if (response.data.article) {
        setSuccessMessage('Article created successfully!');
        setArticles((prevArticles) => [response.data.article, ...prevArticles]);
        setTopic('');
      }
    } catch {
      setError('Failed to create article.');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedArticle(null);
    setIsModalOpen(false);
  };

  return (
    <div className={`${styles.container} flex flex-col items-center px-4 py-6 md:px-8 lg:px-16`}>
      {/* Decorative Circles */}
      <motion.div
        className={`${styles.decorativeCircle} ${styles.circle1}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className={`${styles.decorativeCircle} ${styles.circle2}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Heading */}
      <motion.h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Articles
      </motion.h1>

      {/* Card Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Left Section */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md flex flex-col"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-4">Generate Your Article</h2>
          <form className="flex items-center gap-2" onSubmit={handleGenerateArticle}>
  <input
    className="flex-grow px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
    type="text"
    placeholder="Name of the Topic"
    value={topic}
    onChange={(e) => setTopic(e.target.value)}
    disabled={loading}
    aria-label="Article Topic"
    required
  />
  <motion.button
    type="submit"
    className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-400 focus:outline-none"
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    disabled={loading}
    aria-label="Generate Article"
  >
    <ArrowRight size={20} />
  </motion.button>
</form>

          {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md flex flex-col"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-4">Recently Generated</h2>
          {loading && articles.length === 0 && <p className="text-gray-500">Loading articles...</p>}
          {!loading && articles.length === 0 && <p className="text-gray-500">No articles found. Generate one!</p>}
          <div className="space-y-4">
            {articles.map((article) => (
              <motion.div
                key={article._id}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-4">
                  <FiBook className="text-blue-600" size={24} />
                  <h3 className="font-medium">{article.topic}</h3>
                </div>
                <motion.button
                  className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal(article)}
                  aria-label={`View article on ${article.topic}`}
                >
                  View
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Article Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedArticle?.topic || ''}
      >
        {selectedArticle && (
          <div
            className="prose max-w-full"
            dangerouslySetInnerHTML={{ __html: selectedArticle.content.replace(/\n/g, '<br/>') }}
          />
        )}
      </CustomModal>
    </div>
  );
}

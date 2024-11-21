'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Crown, FileText, HelpCircle } from 'lucide-react';
import styles from '@/styles/ui/Dashboard.module.css';
import { useRouter } from 'next/navigation';

const generateRandomPosition = () => ({
  top: `${Math.floor(Math.random() * 100)}%`,
  left: `${Math.floor(Math.random() * 100)}%`,
});

export default function Home() {
const router = useRouter();
  const handleArticlesClick = () => {
    router.push('/dashboard/articles');
  }
  const handleModelClick = () => {
    router.push('/dashboard/model-question');
  }
  const [particles, setParticles] = useState<{ top: string; left: string }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map(() => generateRandomPosition());
    setParticles(newParticles);
  }, []);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) =>
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);

  return (
    <div className={styles.container}>
      {/* Glowing Border */}
      <div className={styles.glowingBorder} />

      {/* Floating Particles */}
      {particles.map((pos, index) => (
        <div
          key={index}
          className={styles.particle}
          style={{
            width: `${Math.random() * 10 + 10}px`,
            height: `${Math.random() * 10 + 10}px`,
            ...pos,
          }}
        />
      ))}

      <div className="space-y-4 max-w-md w-full z-10">
        {/* Dropdown 1 - Articles */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={styles.dropdown}
          onClick={handleArticlesClick}
        >
          <div className={styles.iconWithText}>
            <FileText />
            <span>Articles</span>
          </div>
          <ChevronRight
            className={`transition-transform duration-300 ${
              openDropdown === 'articles' ? 'rotate-90' : ''
            }`}
          />
        </motion.div>

        {/* Dropdown 2 - Model Question */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={styles.dropdown}
          onClick={handleModelClick}
        >
          <div className={styles.iconWithText}>
            <HelpCircle />
            <span>Model question</span>
          </div>
          <ChevronRight
            className={`transition-transform duration-300 ${
              openDropdown === 'model' ? 'rotate-90' : ''
            }`}
            
          />
        </motion.div>

        {/* Dropdown 3 - Evaluate Performance */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={styles.dropdown}
          onClick={() => toggleDropdown('performance')}
        >
          <div className={styles.iconWithText}>
            <Crown />
            <span>Evaluate performance</span>
          </div>
          <ChevronRight
            className={`transition-transform duration-300 ${
              openDropdown === 'performance' ? 'rotate-90' : ''
            }`}
          />
        </motion.div>
      </div>
    </div>
  );
}
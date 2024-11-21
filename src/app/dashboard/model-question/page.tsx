'use client';
import { motion } from 'framer-motion';
import styles from '@/styles/ui/ModelQuestion.module.css';
import { ArrowRight } from 'lucide-react';

export default function ModelQuestion() {
  return (
    <div className={styles.container}>
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

      {/* Heading with Underline */}
      <motion.h1
        className={styles.heading}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Model Question Upload
      </motion.h1>

      {/* Main Card */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Left Section */}
        <motion.div
          className={styles.leftSection}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className={styles.heading2}>Upload Previous Year Question</h2>
          <div className={styles.uploadBox}>
            Click to browse or drag and drop your files
          </div>

          <p className={styles.orText}>OR</p>

          <h2 className={styles.heading2}>Upload Syllabus</h2>
          <div className={styles.uploadBox}>
            Click to browse or drag and drop your files
          </div>

          <motion.button
            className={styles.generateButton}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Generate
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className={styles.rightSection}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className={styles.rightHeader}>Recently generated</h2>
          <ul className={styles.unorderedList}>
            {['abcdefgh', 'abcdefgh', 'abcdefgh', 'abcdefgh', 'abcdefgh'].map(
              (item, index) => (
                <motion.li
                  key={index}
                  className={styles.listItem}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {item}
                </motion.li>
              )
            )}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}

// app/components/CustomModal.tsx

'use client';

import { ReactNode, useEffect } from 'react';
import styles from '@/styles/ui/CustomModal.module.css';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function CustomModal({ isOpen, onClose, title, children }: CustomModalProps) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <button
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Close Modal"
            >
              &times;
            </button>
            <h2 id="modal-title" className={styles.modalTitle}>
              {title}
            </h2>
            <div className={styles.modalContent}>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

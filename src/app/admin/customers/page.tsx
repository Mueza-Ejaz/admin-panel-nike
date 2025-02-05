// src/UnderConstruction.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaTools } from 'react-icons/fa';

const UnderConstruction: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4 md:ml-64">
      {/* Animated Icon */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="text-white mb-8"
      >
        <FaTools className="w-24 h-24" />
      </motion.div>

      {/* Animated Heading */}
      <motion.h1
        className="text-white text-5xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Under Construction
      </motion.h1>

      {/* Animated Subheading */}
      <motion.p
        className="text-white text-lg text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        We're working hard to bring you something awesome! Please check back soon.
      </motion.p>
    </div>
  );
};

export default UnderConstruction;

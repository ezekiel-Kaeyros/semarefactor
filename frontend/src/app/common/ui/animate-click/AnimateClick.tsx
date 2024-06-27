'use client';
import React from 'react';

import { motion } from 'framer-motion';

const AnimateClick = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="cursor-pointer w-full"
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateClick;

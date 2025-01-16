import React from 'react';
import { motion } from 'framer-motion';

interface CardPreviewProps {
  name: string;
}

export const CardPreview: React.FC<CardPreviewProps> = ({ name }) => {
  return (
    <motion.div
      className="w-full h-56 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full h-full flex flex-col justify-between p-6">
        <div className="text-white text-2xl font-bold">Fan Card</div>
        <motion.div
          className="text-white text-3xl font-extrabold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {name}
        </motion.div>
        <div className="text-white text-sm">Exclusive Member</div>
      </div>
    </motion.div>
  );
};

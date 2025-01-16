import React from "react";
import { motion } from "framer-motion";
import banner from "../../assets/banner.jpg";

const images = [
  banner,
  banner,
  banner,
  banner,
  banner,
  banner,
  banner,
  banner,
];

export const Gallery: React.FC = () => {
  return (
    <section className="px-[5rem] my-16">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {images.map((src, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={src || "/placeholder.svg"}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

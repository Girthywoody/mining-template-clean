import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            About Sudbury Mining Corp.
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Leading the mining industry with innovation, safety, and sustainability for over three decades.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

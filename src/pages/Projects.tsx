import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
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
            Our Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing our successful mining projects and achievements.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;

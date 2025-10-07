import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Users, Award, Globe } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-400">
              Sudbury Mining Corp.
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
              <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
              <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
              <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Professional Mining Solutions
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Leading the industry with innovative mining technologies and sustainable practices for over three decades.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center mx-auto"
            >
              Explore Our Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Us</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We combine cutting-edge technology with decades of expertise to deliver exceptional mining solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Safety First",
                description: "Comprehensive safety protocols and training programs ensuring zero accidents."
              },
              {
                icon: Zap,
                title: "Advanced Technology",
                description: "State-of-the-art equipment and innovative mining techniques for maximum efficiency."
              },
              {
                icon: Users,
                title: "Expert Team",
                description: "Experienced professionals with deep industry knowledge and proven track record."
              },
              {
                icon: Award,
                title: "Quality Assurance",
                description: "Rigorous quality control processes ensuring the highest standards in all operations."
              },
              {
                icon: Globe,
                title: "Global Reach",
                description: "International operations with local expertise and cultural understanding."
              },
              {
                icon: ArrowRight,
                title: "Innovation",
                description: "Continuous research and development to stay ahead of industry trends."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-700 p-8 rounded-2xl hover:bg-gray-600 transition-colors duration-300"
              >
                <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive mining services from exploration to rehabilitation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Mineral Exploration",
              "Mining Operations",
              "Mineral Processing",
              "Environmental Rehabilitation"
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 p-8 rounded-2xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3">{service}</h3>
                <p className="text-gray-300">
                  Professional {service.toLowerCase()} services with industry-leading expertise and technology.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Ready to discuss your mining project? Contact our experts today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Sudbury Mining Corp. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

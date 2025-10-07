import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
import { MagneticButton } from '@/components/MagneticElements';
import { GlassmorphismPanel } from '@/components/GlassmorphismEffects';

const AnimatedFooter = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Process', href: '/process' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Contact', href: '/contact' },
    ],
    services: [
      { name: 'Custom Development', href: '/services' },
      { name: 'Digital Strategy', href: '/services' },
      { name: 'Brand Identity', href: '/services' },
      { name: 'Consulting', href: '/services' },
    ],
    templates: [
      { name: 'Construction', href: '/templates' },
      { name: 'Mining', href: '/templates' },
      { name: 'Business', href: '/templates' },
      { name: 'E-commerce', href: '/templates' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: '𝕏' },
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'GitHub', href: '#', icon: '🐙' },
    { name: 'Instagram', href: '#', icon: '📷' },
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-black" />
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(800px 400px at 20% 80%, rgba(59, 130, 246, 0.1), transparent)',
              'radial-gradient(800px 400px at 80% 20%, rgba(168, 85, 247, 0.1), transparent)',
              'radial-gradient(800px 400px at 20% 80%, rgba(59, 130, 246, 0.1), transparent)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <ScrollReveal direction="up" className="lg:col-span-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <h3 className="text-3xl font-bold mb-4">True North</h3>
                <p className="text-zinc-400 mb-6 leading-relaxed">
                  Professional web development services specializing in custom solutions, digital strategy, and brand identity for businesses of all sizes.
                </p>
                
                <GlassmorphismPanel intensity="light" className="p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm text-zinc-300">Available for new projects</span>
                  </div>
                </GlassmorphismPanel>

                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <ScrollReveal key={category} direction="up" delay={categoryIndex * 0.1}>
                <div>
                  <h4 className="text-lg font-semibold mb-4 capitalize">{category}</h4>
                  <ul className="space-y-3">
                    {links.map((link, index) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: categoryIndex * 0.1 + index * 0.05, duration: 0.6 }}
                      >
                        <Link
                          to={link.href}
                          className="text-zinc-400 hover:text-white transition-colors duration-300 relative group"
                        >
                          {link.name}
                          <motion.div
                            className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white"
                            whileHover={{ width: '100%' }}
                            transition={{ duration: 0.3 }}
                          />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <ScrollReveal direction="up" className="py-8 border-t border-zinc-800">
          <GlassmorphismPanel intensity="medium" className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h4 className="text-xl font-semibold mb-2">Stay Updated</h4>
                <p className="text-zinc-400">Get the latest insights and updates delivered to your inbox.</p>
              </div>
              
              <div className="email-form-container flex w-full md:w-auto max-w-full">
                <motion.input
                  type="email"
                  placeholder="Enter your email"
                  className="email-input flex-1 min-w-0 px-4 py-3 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-zinc-400 focus:outline-none focus:border-white/40 transition-colors duration-300"
                  whileFocus={{ scale: 1.02 }}
                />
                <MagneticButton 
                  strength={0.3}
                  className="subscribe-button flex-shrink-0 px-6 py-3 bg-white text-black rounded-r-lg font-semibold hover:bg-white/90 transition-colors duration-300 whitespace-nowrap"
                >
                  Subscribe
                </MagneticButton>
              </div>
            </div>
          </GlassmorphismPanel>
        </ScrollReveal>

        {/* Bottom Bar */}
        <ScrollReveal direction="up" className="py-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.p 
              className="text-zinc-400 text-sm mb-4 md:mb-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              © 2024 True North Web Solutions. All rights reserved.
            </motion.p>
            
            <div className="flex space-x-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-zinc-400 hover:text-white text-sm transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default AnimatedFooter;

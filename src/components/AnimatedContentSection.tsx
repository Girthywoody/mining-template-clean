import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ParallaxBackground } from '@/components/ParallaxSection';
import { MagneticCard } from '@/components/MagneticElements';
import { GlassmorphismPanel } from '@/components/GlassmorphismEffects';
import { LetterReveal } from '@/components/TypographyAnimations';
import PremiumFeaturesSection from '@/components/PremiumFeaturesSection';

const AnimatedContentSection = () => {
  const services = [
    {
      title: 'Custom Website Development',
      description: 'Build responsive, professional websites that showcase your business and convert visitors into customers.',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    },
    {
      title: 'Digital Strategy & Planning',
      description: 'Strategic consultation to help you maximize your online presence and achieve your business goals.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    },
    {
      title: 'Brand Identity & Design',
      description: 'Create a cohesive visual identity that reflects your brand values and builds trust with your audience.',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    },
  ];

  return (
    <div className="relative">
      {/* Premium Features Section */}
      <PremiumFeaturesSection />

      {/* Services Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <ParallaxBackground speed={0.3}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
        </ParallaxBackground>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal direction="up" className="text-center mb-16">
            <LetterReveal 
              text="Our Services" 
              delay={0.05}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            />
            <motion.p 
              className="text-xl text-zinc-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              We work with you from initial concept to final launch, delivering websites and digital solutions that help your business grow and succeed online.
            </motion.p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 0.2}>
                <MagneticCard className="overflow-hidden rounded-2xl">
                  <div className="relative h-64">
                    <ParallaxBackground speed={0.2}>
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${service.image})` }}
                      />
                      <div className="absolute inset-0 bg-black/40" />
                    </ParallaxBackground>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <GlassmorphismPanel intensity="medium" className="p-6 text-center">
                        <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                        <p className="text-zinc-200">{service.description}</p>
                      </GlassmorphismPanel>
                    </div>
                  </div>
                </MagneticCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <ParallaxBackground speed={0.2}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90" />
        </ParallaxBackground>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <ScrollReveal direction="up">
            <LetterReveal 
              text="Ready to Begin?" 
              delay={0.05}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            />
            <motion.p 
              className="text-xl text-white/90 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              Ready to improve your online presence? Let's discuss how we can help your business succeed with a professional website and digital strategy.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
            >
              <motion.button
                className="px-8 py-6 text-lg font-semibold bg-white text-blue-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
              </motion.button>
              
              <motion.button
                className="px-8 py-6 text-lg font-semibold bg-transparent hover:bg-white/10 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Consultation
              </motion.button>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default AnimatedContentSection;
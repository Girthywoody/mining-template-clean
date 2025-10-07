import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';

const MobileStickyCTA = () => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
      <motion.div
        className="bg-black/80 backdrop-blur-xl border-t border-white/10 px-4 py-3"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {!showOptions ? (
          <motion.button
            className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-lg active:scale-95 transition-transform duration-150"
            onClick={() => setShowOptions(true)}
            whileTap={{ scale: 0.95 }}
          >
            Get a Quote
          </motion.button>
        ) : (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex space-x-3">
              <motion.button
                className="flex-1 h-12 bg-green-500 text-white font-semibold rounded-xl flex items-center justify-center space-x-2 active:scale-95 transition-transform duration-150"
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('tel:+17055626876')}
              >
                <Phone size={18} />
                <span>Call</span>
              </motion.button>
              
              <motion.button
                className="flex-1 h-12 bg-blue-500 text-white font-semibold rounded-xl flex items-center justify-center space-x-2 active:scale-95 transition-transform duration-150"
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('sms:+17055626876')}
              >
                <MessageCircle size={18} />
                <span>Text</span>
              </motion.button>
            </div>
            
            <motion.button
              className="w-full h-10 text-white/70 text-sm active:scale-95 transition-transform duration-150"
              onClick={() => setShowOptions(false)}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MobileStickyCTA;

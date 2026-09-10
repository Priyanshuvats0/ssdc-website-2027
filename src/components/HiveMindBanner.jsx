import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HiveMindBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 1 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-start p-5 rounded-2xl border border-[rgba(0,210,255,0.3)] bg-[#03040a]/90 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,210,255,0.2)] max-w-sm"
        >
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-[rgba(0,210,255,0.2)] to-[rgba(0,119,255,0.2)] flex items-center justify-center border border-[rgba(0,210,255,0.4)] shadow-[0_0_15px_rgba(0,210,255,0.3)]">
              <span className="text-[#00D2FF] font-bold text-lg">HM</span>
            </div>
            <div>
              <h4 className="font-bold text-white text-base">HiveMind 2026</h4>
              <p className="text-xs text-[#00D2FF] uppercase tracking-wider font-semibold mt-0.5">Live Now</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-300 mt-1 mb-5 leading-relaxed">
            A month-long digital challenge festival. Test your skills in UI design, AI prompting, cybersecurity, and more.
          </p>
          
          <a 
            href="https://hivemind-ssdc.vercel.app/" 
            target="_blank" 
            rel="noreferrer"
            className="w-full py-2.5 text-center text-sm font-bold rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#0077FF] text-white hover:shadow-[0_0_20px_rgba(0,210,255,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Enter the Challenge
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HiveMindBanner;

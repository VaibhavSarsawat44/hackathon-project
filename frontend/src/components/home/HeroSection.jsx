import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary-100/50 rounded-full blur-3xl -z-10 opacity-70"></div>
      <div className="absolute top-20 -right-20 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl -z-10 opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-6 border border-primary-100 shadow-sm">
              ✨ The New Standard in Travel
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Experience the world <br className="hidden md:block" />
            <span className="text-gradient">without boundaries.</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Traveloop connects you with authentic local experiences, premium stays, 
            and seamless itineraries designed for the modern explorer.
          </motion.p>
          
          <motion.div 
            className="flex justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/login" className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-full font-semibold transition-all shadow-lg shadow-primary-500/30 flex items-center justify-center group text-lg">
              Start Exploring
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
            </Link>
          </motion.div>
        </div>

        {/* 7 Wonders Map Section */}
        <div className="mt-20 relative w-full flex justify-center">
          <motion.div 
            className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-200/50 relative bg-white aspect-video"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <img src="/wonders-map.png" alt="7 Wonders World Map" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


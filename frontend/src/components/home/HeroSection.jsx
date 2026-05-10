import { motion } from 'framer-motion';
import { ArrowRight, Plane, Map, Compass } from 'lucide-react';
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
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/login" className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg shadow-primary-500/30 flex items-center justify-center group">
              Start Exploring
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <a href="#features" className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-full font-semibold transition-all shadow-sm border border-gray-200 flex items-center justify-center">
              View Destinations
            </a>
          </motion.div>
        </div>

        {/* Floating elements to give the SaaS vibe */}
        <div className="mt-20 relative hidden lg:block">
          <motion.div 
            className="absolute -left-10 top-10 glass p-4 rounded-2xl flex items-center space-x-4 animate-bounce"
            style={{ animationDuration: '4s' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
              <Plane size={24} />
            </div>
            <div>
              <p className="font-semibold text-sm">Flight Booked</p>
              <p className="text-xs text-gray-500">To Tokyo, Japan</p>
            </div>
          </motion.div>

          <motion.div 
            className="absolute -right-5 top-32 glass p-4 rounded-2xl flex items-center space-x-4 animate-bounce"
            style={{ animationDuration: '5s' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
              <Map size={24} />
            </div>
            <div>
              <p className="font-semibold text-sm">New Itinerary</p>
              <p className="text-xs text-gray-500">Alpine Adventure</p>
            </div>
          </motion.div>

          <motion.div 
            className="w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 relative bg-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {/* Dashboard Mockup Placeholder */}
            <div className="w-full h-12 bg-gray-50 border-b border-gray-100 flex items-center px-6 space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="p-8 h-full bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
              <Compass className="text-gray-200 w-32 h-32" />
              <p className="absolute text-gray-400 font-medium">Interactive Map & Dashboard UI</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

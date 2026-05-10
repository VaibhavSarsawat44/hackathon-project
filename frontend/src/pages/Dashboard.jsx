import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, SortDesc, Grid, Plus, MapPin, Calendar } from 'lucide-react';

const Dashboard = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const personalSelections = [
    { id: 1, title: 'Mountain Escapes', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=80' },
    { id: 2, title: 'Beach Resorts', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=500&auto=format&fit=crop&q=80' },
    { id: 3, title: 'City Tours', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=500&auto=format&fit=crop&q=80' },
    { id: 4, title: 'Camping', image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500&auto=format&fit=crop&q=80' },
    { id: 5, title: 'Road Trips', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&auto=format&fit=crop&q=80' },
  ];

  const previousTrips = [
    { id: 1, location: 'Kyoto, Japan', date: 'Oct 2024', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&auto=format&fit=crop&q=80' },
    { id: 2, location: 'Santorini, Greece', date: 'Jul 2024', image: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?w=500&auto=format&fit=crop&q=80' },
    { id: 3, location: 'Swiss Alps', date: 'Dec 2023', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24 font-sans">
      
      {/* Subtle Background Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        


        {/* Banner Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden mb-8 group shadow-2xl border border-gray-800"
        >
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
            alt="Banner" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-900/40 to-transparent flex items-center justify-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg"
            >
              Explore The Unknown
            </motion.h2>
          </div>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-12"
        >
          <Link to="/search" className="flex-1 relative group block">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500 group-hover:text-primary-500 transition-colors" />
            </div>
            <div className="w-full bg-gray-900/80 border border-gray-700 text-gray-500 rounded-2xl pl-12 pr-4 py-3.5 hover:border-primary-500 transition-all shadow-inner cursor-pointer">
              Search destinations, trips, or activities...
            </div>
          </Link>
          <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <button className="flex items-center whitespace-nowrap bg-gray-900/80 border border-gray-700 hover:border-gray-500 text-gray-300 px-5 py-3.5 rounded-2xl transition-all hover:bg-gray-800">
              <Grid className="w-4 h-4 mr-2" /> Group by
            </button>
            <button className="flex items-center whitespace-nowrap bg-gray-900/80 border border-gray-700 hover:border-gray-500 text-gray-300 px-5 py-3.5 rounded-2xl transition-all hover:bg-gray-800">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </button>
            <button className="flex items-center whitespace-nowrap bg-gray-900/80 border border-gray-700 hover:border-gray-500 text-gray-300 px-5 py-3.5 rounded-2xl transition-all hover:bg-gray-800">
              <SortDesc className="w-4 h-4 mr-2" /> Sort by...
            </button>
          </div>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          
          {/* Personal Selections */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <h3 className="text-2xl font-semibold text-white mr-4">Personal Selections</h3>
              <div className="h-px bg-gray-800 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {personalSelections.map((item) => (
                <motion.div 
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group border border-gray-800 shadow-lg"
                >
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-medium text-sm md:text-base leading-tight drop-shadow-md">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Previous Trips */}
          <div className="mb-12 relative">
            <div className="flex items-center mb-6">
              <h3 className="text-2xl font-semibold text-white mr-4">Previous Trips</h3>
              <div className="h-px bg-gray-800 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {previousTrips.map((trip) => (
                <motion.div 
                  key={trip.id}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative h-80 rounded-3xl overflow-hidden cursor-pointer group border border-gray-800 shadow-xl"
                >
                  <img src={trip.image} alt={trip.location} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent opacity-90 transition-opacity"></div>
                  
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center">
                    <Calendar className="w-3.5 h-3.5 text-gray-300 mr-1.5" />
                    <span className="text-xs text-gray-200 font-medium">{trip.date}</span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 transform transition-transform duration-300 group-hover:-translate-y-2">
                    <div className="flex items-center mb-2">
                      <MapPin className="text-primary-400 w-4 h-4 mr-1.5" />
                      <p className="text-primary-300 text-sm font-medium uppercase tracking-wider">Visited</p>
                    </div>
                    <h4 className="text-2xl font-bold text-white drop-shadow-md">{trip.location}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </motion.div>

        {/* Floating Action Button */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Link 
            to="/create-trip"
            className="bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white px-6 py-4 rounded-full font-bold shadow-[0_10px_40px_rgba(79,70,229,0.5)] border border-white/10 flex items-center group transition-all transform hover:scale-105 active:scale-95"
          >
            <Plus className="w-6 h-6 mr-2 transition-transform group-hover:rotate-90 duration-300" />
            Plan a trip
          </Link>
        </motion.div>
        
      </div>
    </div>
  );
};

export default Dashboard;

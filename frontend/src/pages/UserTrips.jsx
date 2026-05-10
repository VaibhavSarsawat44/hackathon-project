import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, SortDesc, Calendar, MapPin, ArrowRight, Clock, CheckCircle, Navigation } from 'lucide-react';

const UserTrips = () => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  // Mock data for the trips
  const trips = {
    ongoing: [
      {
        id: 1,
        title: 'European Summer Backpacking',
        location: 'Multiple Cities, Europe',
        dateRange: 'Aug 15 - Sep 10, 2025',
        image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&auto=format&fit=crop&q=80',
        progress: 45,
        status: 'ongoing'
      }
    ],
    upcoming: [
      {
        id: 2,
        title: 'Bali Retreat',
        location: 'Bali, Indonesia',
        dateRange: 'Nov 5 - Nov 20, 2025',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80',
        daysLeft: 42,
        status: 'upcoming'
      }
    ],
    completed: [
      {
        id: 3,
        title: 'New York City Weekend',
        location: 'New York, USA',
        dateRange: 'Dec 10 - Dec 14, 2024',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop&q=80',
        status: 'completed'
      },
      {
        id: 4,
        title: 'Himalayan Trek',
        location: 'Nepal',
        dateRange: 'Mar 1 - Mar 15, 2024',
        image: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=800&auto=format&fit=crop&q=80',
        status: 'completed'
      }
    ]
  };

  const renderTripCard = (trip, type) => {
    let badgeColor = '';
    let Icon = null;
    
    if (type === 'ongoing') {
      badgeColor = 'bg-primary-500/20 text-primary-300 border-primary-500/30';
      Icon = Navigation;
    } else if (type === 'upcoming') {
      badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      Icon = Clock;
    } else {
      badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      Icon = CheckCircle;
    }

    return (
      <motion.div 
        key={trip.id}
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.01 }}
        className="relative overflow-hidden rounded-[2rem] bg-gray-900/60 backdrop-blur-xl border border-gray-800 shadow-xl group cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row h-full">
          {/* Trip Image */}
          <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
            <img 
              src={trip.image} 
              alt={trip.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-gray-950 via-gray-900/40 to-transparent"></div>
            
            <div className="absolute top-4 left-4">
              <div className={`px-3 py-1.5 rounded-full border flex items-center backdrop-blur-md shadow-lg ${badgeColor}`}>
                <Icon className="w-3.5 h-3.5 mr-1.5" />
                <span className="text-xs font-bold uppercase tracking-wider">{type}</span>
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-center relative z-10">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">{trip.title}</h3>
            
            <div className="flex flex-col space-y-2 mb-6">
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2 text-indigo-400" />
                <span>{trip.location}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Calendar className="w-4 h-4 mr-2 text-primary-400" />
                <span>{trip.dateRange}</span>
              </div>
            </div>

            {type === 'ongoing' && (
              <div className="mt-auto">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>Trip Progress</span>
                  <span>{trip.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-500 to-indigo-500" style={{ width: `${trip.progress}%` }}></div>
                </div>
              </div>
            )}

            {type === 'upcoming' && (
              <div className="mt-auto">
                <p className="text-amber-400/90 font-medium text-sm flex items-center">
                  <Clock className="w-4 h-4 mr-1.5" /> {trip.daysLeft} days left until departure
                </p>
              </div>
            )}

            <div className="absolute bottom-6 right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-32 font-sans relative overflow-hidden">
      
      {/* Dynamic Background Effects */}
      <div className="fixed top-1/4 left-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400 mb-2">
              My Trips
            </h1>
            <p className="text-gray-400">Manage and view all your travel itineraries.</p>
          </div>


          <div className="flex gap-3">
            <div className="relative group w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500 group-focus-within:text-primary-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search trips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900/80 border border-gray-700 text-white rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-sm"
              />
            </div>
            <button className="flex items-center bg-gray-900/80 border border-gray-700 hover:border-gray-500 text-gray-300 px-4 py-2.5 rounded-xl transition-all hover:bg-gray-800 text-sm">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </button>
            <button className="flex items-center bg-gray-900/80 border border-gray-700 hover:border-gray-500 text-gray-300 px-4 py-2.5 rounded-xl transition-all hover:bg-gray-800 text-sm">
              <SortDesc className="w-4 h-4 mr-2" /> Sort by...
            </button>
          </div>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
          
          {/* Ongoing Section */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-semibold text-white mr-4 flex items-center">
                <Navigation className="w-5 h-5 mr-2 text-primary-400" /> Ongoing
              </h2>
              <div className="h-px bg-gray-800 flex-grow"></div>
            </div>
            <div className="space-y-6">
              {trips.ongoing.map(trip => renderTripCard(trip, 'ongoing'))}
            </div>
          </motion.section>

          {/* Upcoming Section */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-semibold text-white mr-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-amber-400" /> Up-coming
              </h2>
              <div className="h-px bg-gray-800 flex-grow"></div>
            </div>
            <div className="space-y-6">
              {trips.upcoming.map(trip => renderTripCard(trip, 'upcoming'))}
            </div>
          </motion.section>

          {/* Completed Section */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-semibold text-white mr-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-emerald-400" /> Completed
              </h2>
              <div className="h-px bg-gray-800 flex-grow"></div>
            </div>
            <div className="space-y-6">
              {trips.completed.map(trip => renderTripCard(trip, 'completed'))}
            </div>
          </motion.section>

        </motion.div>
      </div>
    </div>
  );
};

export default UserTrips;

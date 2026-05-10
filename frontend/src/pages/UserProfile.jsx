import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, Edit3, MapPin, Calendar, Mail, Phone, Globe, ArrowRight, Briefcase } from 'lucide-react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Tanishq Narang',
    email: 'tanishq.narang@email.com',
    phone: '+91 98765 43210',
    location: 'New Delhi, India',
    bio: 'Passionate traveler and adventure seeker. Love exploring new cultures, cuisines, and hidden gems around the world.',
    joinedDate: 'Jan 2024',
    tripsCount: 12,
    countriesVisited: 8
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const preplannedTrips = [
    { id: 1, title: 'Tokyo Adventure', location: 'Tokyo, Japan', date: 'Dec 2025', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&auto=format&fit=crop&q=80' },
    { id: 2, title: 'Safari Expedition', location: 'Serengeti, Tanzania', date: 'Feb 2026', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&auto=format&fit=crop&q=80' },
    { id: 3, title: 'Northern Lights', location: 'Tromsø, Norway', date: 'Mar 2026', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500&auto=format&fit=crop&q=80' },
  ];

  const previousTrips = [
    { id: 4, title: 'Parisian Getaway', location: 'Paris, France', date: 'Sep 2024', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=500&auto=format&fit=crop&q=80' },
    { id: 5, title: 'Greek Islands', location: 'Mykonos, Greece', date: 'Jun 2024', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=500&auto=format&fit=crop&q=80' },
    { id: 6, title: 'Dubai Luxury', location: 'Dubai, UAE', date: 'Jan 2024', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&auto=format&fit=crop&q=80' },
  ];

  const TripCard = ({ trip }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative h-72 rounded-2xl overflow-hidden cursor-pointer group border border-gray-800 shadow-xl"
    >
      <img src={trip.image} alt={trip.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity"></div>
      
      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center">
        <Calendar className="w-3.5 h-3.5 text-gray-300 mr-1.5" />
        <span className="text-xs text-gray-200 font-medium">{trip.date}</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 transform transition-transform duration-300 group-hover:-translate-y-2">
        <h4 className="text-lg font-bold text-white mb-1">{trip.title}</h4>
        <p className="text-gray-400 text-sm flex items-center mb-4">
          <MapPin className="w-3.5 h-3.5 mr-1.5 text-primary-400" /> {trip.location}
        </p>
        <Link 
          to="/build-itinerary"
          className="w-full flex items-center justify-center py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          View <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-32 font-sans relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-1/4 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 relative z-10">
        
        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          {/* ─── Profile Header ────────────────────────────────────────── */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 p-8 md:p-10 rounded-[2rem] shadow-2xl mb-12 relative overflow-hidden"
          >
            {/* Decorative top gradient line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-indigo-500"></div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              <div className="relative group flex-shrink-0">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-gray-700 overflow-hidden shadow-[0_0_30px_rgba(79,70,229,0.2)] group-hover:border-primary-500 transition-colors duration-300"
                >
                  <img src="https://i.pravatar.cc/300?img=11" alt="Profile" className="w-full h-full object-cover" />
                </motion.div>
                <button className="absolute bottom-1 right-1 w-10 h-10 bg-primary-600 hover:bg-primary-500 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-lg transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* User Details */}
              <div className="flex-grow text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                  <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className={`self-center md:self-auto px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${isEditing ? 'bg-primary-600 border-primary-500 text-white' : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'}`}
                  >
                    <Edit3 className="w-3.5 h-3.5 inline mr-1.5" />
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>

                <p className="text-gray-400 mb-5 max-w-xl leading-relaxed">{userData.bio}</p>

                <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 text-sm text-gray-400">
                  <span className="flex items-center"><Mail className="w-4 h-4 mr-2 text-indigo-400" /> {userData.email}</span>
                  <span className="flex items-center"><Phone className="w-4 h-4 mr-2 text-teal-400" /> {userData.phone}</span>
                  <span className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-primary-400" /> {userData.location}</span>
                  <span className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-amber-400" /> Joined {userData.joinedDate}</span>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-800">
              {[
                { label: 'Total Trips', value: userData.tripsCount, icon: <Briefcase className="w-5 h-5 text-primary-400" /> },
                { label: 'Countries', value: userData.countriesVisited, icon: <Globe className="w-5 h-5 text-indigo-400" /> },
                { label: 'Planned', value: preplannedTrips.length, icon: <Calendar className="w-5 h-5 text-teal-400" /> },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -4 }}
                  className="text-center p-4 rounded-2xl bg-gray-950/50 border border-gray-800 hover:border-gray-700 transition-colors cursor-default"
                >
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ─── Preplanned Trips ──────────────────────────────────────── */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-semibold text-white mr-4">Preplanned Trips</h2>
              <div className="h-px bg-gray-800 flex-grow"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {preplannedTrips.map(trip => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </motion.div>

          {/* ─── Previous Trips ────────────────────────────────────────── */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-semibold text-white mr-4">Previous Trips</h2>
              <div className="h-px bg-gray-800 flex-grow"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {previousTrips.map(trip => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, SortDesc, Grid, Plus, MapPin, Calendar, ClipboardList, Receipt, Loader, ChevronDown, Check } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  // State Management
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Dropdown UI States
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Search, Filter, Sort, Group Options
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [groupBy, setGroupBy] = useState('none');

  // Load Trips from Database
  const fetchTrips = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login if token is missing
        navigate('/login');
        return;
      }

      // Build query string
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (statusFilter && statusFilter !== 'all') params.append('status', statusFilter);
      if (sortBy) {
        params.append('sortBy', sortBy);
        params.append('order', sortOrder);
      }

      const res = await fetch(`/api/trips?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setTrips(data.data.trips);
      } else {
        setError(data.message || 'Failed to load trips');
      }
    } catch (err) {
      setError('Could not establish connection to the backend database.');
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when Search, Filter, Sort state changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchTrips();
    }, 300); // 300ms debounce to prevent rapid sequential server requests

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, statusFilter, sortBy, sortOrder]);

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

  // Fallback high-quality mock selections
  const personalSelections = [
    { id: 1, title: 'Mountain Escapes', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=80' },
    { id: 2, title: 'Beach Resorts', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=500&auto=format&fit=crop&q=80' },
    { id: 3, title: 'City Tours', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=500&auto=format&fit=crop&q=80' },
    { id: 4, title: 'Camping', image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500&auto=format&fit=crop&q=80' },
    { id: 5, title: 'Road Trips', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&auto=format&fit=crop&q=80' },
  ];

  // Fallback high-quality mock previous trips for first-time visitors
  const mockPreviousTrips = [
    { _id: 'mock1', tripName: 'Trip to Kyoto, Japan', description: 'Exploring Zen gardens and old palaces.', startDate: '2024-10-15', endDate: '2024-10-25', status: 'completed', coverPhoto: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&auto=format&fit=crop&q=80' },
    { _id: 'mock2', tripName: 'Trip to Santorini, Greece', description: 'Sunny cliffs and spectacular Aegean sunsets.', startDate: '2024-07-02', endDate: '2024-07-12', status: 'completed', coverPhoto: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?w=500&auto=format&fit=crop&q=80' },
    { _id: 'mock3', tripName: 'Trip to Swiss Alps', description: 'Skiing and scenic train rides.', startDate: '2023-12-20', endDate: '2023-12-30', status: 'completed', coverPhoto: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500&auto=format&fit=crop&q=80' },
  ];

  // Resolve which trips to render (DB trips first; fallback to mocks if DB is empty and user isn't searching/filtering)
  const displayTrips = trips.length > 0 
    ? trips 
    : (searchQuery || statusFilter !== 'all' ? [] : mockPreviousTrips);

  // Group displayTrips if grouping is active
  const groupedTrips = {};
  if (groupBy === 'status') {
    displayTrips.forEach(t => {
      const statusKey = t.status || 'planning';
      if (!groupedTrips[statusKey]) {
        groupedTrips[statusKey] = [];
      }
      groupedTrips[statusKey].push(t);
    });
  }

  const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24 font-sans relative overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        
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
          {/* Active Interactive Search Input */}
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <Search className="h-5 w-5 text-gray-500 group-focus-within:text-primary-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search destinations, trips, or activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900/80 border border-gray-700 text-white rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all shadow-inner"
            />
          </div>

          <div className="flex flex-wrap gap-3 relative z-30">
            
            {/* Group By Selector */}
            <div className="relative">
              <button 
                onClick={() => { setIsGroupOpen(!isGroupOpen); setIsFilterOpen(false); setIsSortOpen(false); }}
                className={`flex items-center whitespace-nowrap bg-gray-900/80 border ${groupBy !== 'none' ? 'border-primary-500 text-primary-400' : 'border-gray-700 text-gray-300'} hover:border-gray-500 px-5 py-3.5 rounded-2xl transition-all hover:bg-gray-800`}
              >
                <Grid className="w-4 h-4 mr-2" /> Group: {groupBy === 'none' ? 'Off' : capitalize(groupBy)}
                <ChevronDown className="w-4 h-4 ml-2 opacity-60" />
              </button>
              <AnimatePresence>
                {isGroupOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-48 bg-gray-900/70 backdrop-blur-2xl border border-gray-700/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] py-2 z-50 overflow-hidden"
                  >
                    <button 
                      onClick={() => { setGroupBy('none'); setIsGroupOpen(false); }}
                      className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-primary-600 hover:text-white transition-colors"
                    >
                      No Grouping {groupBy === 'none' && <Check className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => { setGroupBy('status'); setIsGroupOpen(false); }}
                      className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-primary-600 hover:text-white transition-colors"
                    >
                      By Status {groupBy === 'status' && <Check className="w-4 h-4" />}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Filter Selector */}
            <div className="relative">
              <button 
                onClick={() => { setIsFilterOpen(!isFilterOpen); setIsGroupOpen(false); setIsSortOpen(false); }}
                className={`flex items-center whitespace-nowrap bg-gray-900/80 border ${statusFilter !== 'all' ? 'border-primary-500 text-primary-400' : 'border-gray-700 text-gray-300'} hover:border-gray-500 px-5 py-3.5 rounded-2xl transition-all hover:bg-gray-800`}
              >
                <Filter className="w-4 h-4 mr-2" /> Status: {statusFilter === 'all' ? 'All' : capitalize(statusFilter)}
                <ChevronDown className="w-4 h-4 ml-2 opacity-60" />
              </button>
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-48 bg-gray-900/70 backdrop-blur-2xl border border-gray-700/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] py-2 z-50 overflow-hidden"
                  >
                    {['all', 'planning', 'upcoming', 'ongoing', 'completed'].map((st) => (
                      <button 
                        key={st}
                        onClick={() => { setStatusFilter(st); setIsFilterOpen(false); }}
                        className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-primary-600 hover:text-white transition-colors"
                      >
                        {st === 'all' ? 'All Statuses' : capitalize(st)} 
                        {statusFilter === st && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sort By Selector */}
            <div className="relative">
              <button 
                onClick={() => { setIsSortOpen(!isSortOpen); setIsGroupOpen(false); setIsFilterOpen(false); }}
                className="flex items-center whitespace-nowrap bg-gray-900/80 border border-gray-700 hover:border-gray-500 text-gray-300 px-5 py-3.5 rounded-2xl transition-all hover:bg-gray-800"
              >
                <SortDesc className="w-4 h-4 mr-2" /> Sort By
                <ChevronDown className="w-4 h-4 ml-2 opacity-60" />
              </button>
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 bg-gray-900/70 backdrop-blur-2xl border border-gray-700/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] py-2 z-50 overflow-hidden"
                  >
                    <button 
                      onClick={() => { setSortBy('createdAt'); setSortOrder('desc'); setIsSortOpen(false); }}
                      className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-primary-600 hover:text-white transition-colors"
                    >
                      Latest Created {sortBy === 'createdAt' && <Check className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => { setSortBy('startDate'); setSortOrder('asc'); setIsSortOpen(false); }}
                      className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-primary-600 hover:text-white transition-colors"
                    >
                      Earliest Start Date {sortBy === 'startDate' && <Check className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => { setSortBy('totalBudget'); setSortOrder('desc'); setIsSortOpen(false); }}
                      className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-primary-600 hover:text-white transition-colors"
                    >
                      Budget: High to Low {sortBy === 'totalBudget' && sortOrder === 'desc' && <Check className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => { setSortBy('totalBudget'); setSortOrder('asc'); setIsSortOpen(false); }}
                      className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-primary-600 hover:text-white transition-colors"
                    >
                      Budget: Low to High {sortBy === 'totalBudget' && sortOrder === 'asc' && <Check className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => { setSortBy('tripName'); setSortOrder('asc'); setIsSortOpen(false); }}
                      className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-primary-600 hover:text-white transition-colors"
                    >
                      Alphabetical (A-Z) {sortBy === 'tripName' && <Check className="w-4 h-4" />}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/invoice" className="flex items-center whitespace-nowrap bg-emerald-600/20 border border-emerald-500/30 hover:bg-emerald-600/30 text-emerald-400 px-5 py-3.5 rounded-2xl transition-all font-bold">
              <Receipt className="w-4 h-4 mr-2" /> Invoice
            </Link>
            <Link to="/packing-checklist" className="flex items-center whitespace-nowrap bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/30 text-indigo-400 px-5 py-3.5 rounded-2xl transition-all font-bold">
              <ClipboardList className="w-4 h-4 mr-2" /> Packing Checklist
            </Link>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 z-10 relative">
            <Loader className="w-12 h-12 text-primary-500 animate-spin mb-4" />
            <p className="text-gray-400">Fetching dynamic trips from database...</p>
          </div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10">
            
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

            {/* Dynamic / Interactive Trips Listing */}
            <div className="mb-12 relative">
              <div className="flex items-center mb-6">
                <h3 className="text-2xl font-semibold text-white mr-4">
                  {groupBy === 'status' ? 'Trips Grouped by Status' : 'Your Trips'}
                </h3>
                <div className="h-px bg-gray-800 flex-grow"></div>
              </div>

              {displayTrips.length === 0 ? (
                <div className="text-center py-16 bg-gray-900/40 border border-gray-800 rounded-3xl">
                  <p className="text-gray-400 text-lg mb-2">No trips found matching your parameters.</p>
                  <p className="text-gray-600 text-sm">Try clearing your filters or create a new trip!</p>
                </div>
              ) : groupBy === 'status' ? (
                /* Render Grouped Layout */
                <div className="space-y-12">
                  {Object.keys(groupedTrips).map(status => (
                    <div key={status} className="space-y-4">
                      <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400 border-b border-gray-800 pb-2 capitalize">
                        {status} Trips ({groupedTrips[status].length})
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {groupedTrips[status].map((trip) => (
                          <TripCard key={trip._id} trip={trip} itemVariants={itemVariants} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Render Flat Layout */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {displayTrips.map((trip) => (
                    <TripCard key={trip._id} trip={trip} itemVariants={itemVariants} />
                  ))}
                </div>
              )}
            </div>

          </motion.div>
        )}

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

// Extracted Gorgeous Trip Card Component
const TripCard = ({ trip, itemVariants }) => {
  const isMock = trip._id.startsWith('mock');
  const targetLink = isMock ? '/build-itinerary' : `/build-itinerary?tripId=${trip._id}`;
  
  // Format Date Nicely
  const formatDateRange = () => {
    if (!trip.startDate) return 'Flexible Dates';
    const start = new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return start;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing': return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
      case 'upcoming': return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'completed': return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
      default: return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
    }
  };

  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative h-80 rounded-3xl overflow-hidden cursor-pointer group border border-gray-800 shadow-xl"
    >
      <Link to={targetLink} className="absolute inset-0 block z-10">
        <img 
          src={trip.coverPhoto || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop'} 
          alt={trip.tripName} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent opacity-90 transition-opacity"></div>
        
        {/* Floating Date Badge */}
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center">
          <Calendar className="w-3.5 h-3.5 text-gray-300 mr-1.5" />
          <span className="text-xs text-gray-200 font-medium">{formatDateRange()}</span>
        </div>

        {/* Floating Status Badge */}
        {trip.status && (
          <div className={`absolute top-4 left-4 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(trip.status)}`}>
            {trip.status}
          </div>
        )}

        <div className="absolute bottom-6 left-6 right-6 transform transition-transform duration-300 group-hover:-translate-y-2">
          <div className="flex items-center mb-2">
            <MapPin className="text-primary-400 w-4 h-4 mr-1.5" />
            <p className="text-primary-300 text-sm font-medium uppercase tracking-wider">
              {trip.status === 'completed' ? 'Visited' : 'Active'}
            </p>
          </div>
          <h4 className="text-2xl font-bold text-white drop-shadow-md leading-tight line-clamp-2">{trip.tripName}</h4>
        </div>
      </Link>
    </motion.div>
  );
};

export default Dashboard;

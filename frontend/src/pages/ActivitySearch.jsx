import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SortDesc, Grid, MapPin, Star, Clock, DollarSign, ArrowRight, X, Compass } from 'lucide-react';

const ActivitySearch = () => {
  const [searchQuery, setSearchQuery] = useState('Adventure Activities');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const filters = ['all', 'activities', 'cities', 'tours', 'experiences'];

  const results = [
    {
      id: 1,
      title: 'Scuba Diving in the Maldives',
      location: 'Malé Atoll, Maldives',
      type: 'activities',
      rating: 4.9,
      reviews: 2340,
      price: '$180',
      duration: '2-3 hours',
      image: '/images/activities/scuba-diving.png',
      tags: ['Underwater', 'Marine Life', 'Tropical'],
      featured: true
    },
    {
      id: 2,
      title: 'Mountain Hiking in the Dolomites',
      location: 'Dolomites, Italy',
      type: 'activities',
      rating: 4.8,
      reviews: 1820,
      price: '$85',
      duration: 'Full Day',
      image: '/images/activities/hiking.png',
      tags: ['Trekking', 'Mountains', 'Alpine'],
    },
    {
      id: 3,
      title: 'Surfing at Gold Coast',
      location: 'Gold Coast, Australia',
      type: 'activities',
      rating: 4.7,
      reviews: 3100,
      price: '$120',
      duration: '3-4 hours',
      image: '/images/activities/surfing.png',
      tags: ['Water Sports', 'Beach', 'Waves'],
    },
    {
      id: 4,
      title: 'Hot Air Balloon over Cappadocia',
      location: 'Cappadocia, Turkey',
      type: 'experiences',
      rating: 4.9,
      reviews: 4200,
      price: '$250',
      duration: '1-2 hours',
      image: '/images/activities/hot-air-balloon.png',
      tags: ['Aerial', 'Sunrise', 'Iconic'],
    },
    {
      id: 5,
      title: 'Kayaking in Ha Long Bay',
      location: 'Ha Long Bay, Vietnam',
      type: 'activities',
      rating: 4.8,
      reviews: 1540,
      price: '$45',
      duration: 'Half Day',
      image: '/images/activities/kayaking.png',
      tags: ['Water Sports', 'Nature', 'Scenic'],
    },
    {
      id: 6,
      title: 'Zip-lining through Rainforest',
      location: 'Arenal, Costa Rica',
      type: 'tours',
      rating: 4.6,
      reviews: 720,
      price: '$95',
      duration: '2-3 hours',
      image: '/images/activities/zip-lining.png',
      tags: ['Adventure', 'Jungle', 'Adrenaline'],
    },
    {
      id: 7,
      title: 'Snorkeling at Great Barrier Reef',
      location: 'Cairns, Australia',
      type: 'activities',
      rating: 4.9,
      reviews: 2100,
      price: '$150',
      duration: 'Full Day',
      image: '/images/activities/snorkeling.png',
      tags: ['Marine Life', 'Coral Reef', 'Tropical'],
    },
  ];

  const filteredResults = activeFilter === 'all' 
    ? results 
    : results.filter(r => r.type === activeFilter);

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-32 font-sans relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="fixed top-1/3 right-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 relative z-10">

        {/* Search Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Search Input */}
          <div className="relative group mb-5">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500 group-focus-within:text-primary-400 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search activities, cities, experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900/80 backdrop-blur-xl border border-gray-700 text-white rounded-2xl pl-14 pr-14 py-4 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-lg shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {filters.map(f => (
                <button 
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    activeFilter === f 
                      ? 'bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-500/20' 
                      : 'bg-gray-900/80 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            {/* Sort & Group */}
            <div className="flex gap-2">
              <button className="flex items-center bg-gray-900/80 border border-gray-700 hover:border-gray-500 text-gray-300 px-4 py-2 rounded-xl transition-all hover:bg-gray-800 text-sm">
                <Grid className="w-4 h-4 mr-2" /> Group by
              </button>
              <button className="flex items-center bg-gray-900/80 border border-gray-700 hover:border-gray-500 text-gray-300 px-4 py-2 rounded-xl transition-all hover:bg-gray-800 text-sm">
                <Filter className="w-4 h-4 mr-2" /> Filter
              </button>
              <button className="flex items-center bg-gray-900/80 border border-gray-700 hover:border-gray-500 text-gray-300 px-4 py-2 rounded-xl transition-all hover:bg-gray-800 text-sm">
                <SortDesc className="w-4 h-4 mr-2" /> Sort by...
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center mb-6"
        >
          <h2 className="text-xl font-semibold text-white mr-3">Results</h2>
          <span className="text-sm text-gray-500 bg-gray-900 px-3 py-1 rounded-full border border-gray-800">{filteredResults.length} found</span>
          <div className="h-px bg-gray-800 flex-grow ml-4"></div>
        </motion.div>

        {/* Results List */}
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
          className="space-y-4"
        >
          <AnimatePresence>
            {filteredResults.map((result) => (
              <motion.div
                key={result.id}
                variants={itemVariants}
                layout
                whileHover={{ x: 6 }}
                className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden cursor-pointer group hover:border-gray-700 transition-all relative"
              >
                {/* Featured badge */}
                {result.featured && (
                  <div className="absolute top-0 left-0 z-10">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-br-xl shadow-lg">
                      Featured
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="sm:w-48 h-40 sm:h-auto relative overflow-hidden flex-shrink-0">
                    <img src={result.image} alt={result.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/60 hidden sm:block"></div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 flex-grow flex flex-col justify-center">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">{result.title}</h3>
                        <p className="text-sm text-gray-400 flex items-center mt-1">
                          <MapPin className="w-3.5 h-3.5 mr-1.5 text-primary-400" /> {result.location}
                        </p>
                      </div>
                      <div className="flex items-center bg-gray-950/60 px-3 py-1.5 rounded-full border border-gray-800 self-start">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 mr-1.5" />
                        <span className="text-sm font-bold text-white">{result.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({result.reviews.toLocaleString()})</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                      <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 text-indigo-400" /> {result.duration}</span>
                      <span className="flex items-center"><DollarSign className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> From {result.price}</span>
                      <span className="flex items-center"><Compass className="w-3.5 h-3.5 mr-1.5 text-teal-400" /> {result.type.charAt(0).toUpperCase() + result.type.slice(1)}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {result.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 bg-gray-800/80 text-gray-400 rounded-lg text-xs font-medium border border-gray-700/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div className="hidden sm:flex items-center pr-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-primary-600/20 border border-primary-500/30 flex items-center justify-center text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};

export default ActivitySearch;

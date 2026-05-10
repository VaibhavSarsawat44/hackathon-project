import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, SortAsc, MapPin, DollarSign, Clock, 
  ChevronRight, MoreVertical, Download, Share2, Plus,
  TrendingDown, CreditCard, Wallet, ArrowRight, Calendar
} from 'lucide-react';

const ItineraryView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('Paris, France');
  const [viewMode, setViewMode] = useState('detailed'); // 'detailed' or 'timeline'
  
  const [itinerary, setItinerary] = useState([
    {
      day: 1,
      date: 'Oct 12',
      activities: [
        { id: 1, time: '09:00 AM', activity: 'Breakfast at Café de Flore', category: 'Food', expense: 25, location: 'St Germain' },
        { id: 2, time: '11:00 AM', activity: 'Louvre Museum Tour', category: 'Sightseeing', expense: 45, location: '1st Arr.' },
        { id: 3, time: '02:00 PM', activity: 'Walk through Tuileries Garden', category: 'Leisure', expense: 0, location: '1st Arr.' },
        { id: 4, time: '07:00 PM', activity: 'Dinner Cruise on Seine', category: 'Experience', expense: 120, location: 'River Seine' },
      ]
    },
    {
      day: 2,
      date: 'Oct 13',
      activities: [
        { id: 5, time: '10:00 AM', activity: 'Eiffel Tower Summit Access', category: 'Sightseeing', expense: 65, location: '7th Arr.' },
        { id: 6, time: '01:00 PM', activity: 'Lunch at Le Jules Verne', category: 'Food', expense: 150, location: 'Eiffel Tower' },
        { id: 7, time: '04:00 PM', activity: 'Shopping at Galeries Lafayette', category: 'Shopping', expense: 200, location: '9th Arr.' },
      ]
    }
  ]);

  const updateExpense = (dayId, actId, newExpense) => {
    const val = parseFloat(newExpense) || 0;
    setItinerary(itinerary.map(day => {
      if (day.day === dayId) {
        return {
          ...day,
          activities: day.activities.map(act => act.id === actId ? { ...act, expense: val } : act)
        };
      }
      return day;
    }));
  };

  const totalBudget = itinerary.reduce((acc, day) => 
    acc + day.activities.reduce((dAcc, act) => dAcc + act.expense, 0), 0
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-primary-500/30 pb-20">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary-600/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 text-primary-400 font-medium mb-2">
              <MapPin className="w-4 h-4" />
              <span>Itinerary Details</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              {selectedPlace} <span className="text-gray-500 font-light">Exploration</span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 transition-all text-sm font-medium">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 rounded-xl transition-all text-sm font-bold shadow-lg shadow-primary-900/20">
              <Share2 className="w-4 h-4" /> Share Trip
            </button>
          </motion.div>
        </div>

        {/* Toolbar Section - Matching Wireframe */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-4 rounded-2xl flex flex-col lg:flex-row items-center gap-4 mb-10 shadow-2xl"
        >
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search activity..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-12 pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="flex bg-gray-950 p-1 rounded-xl border border-gray-800">
              <button 
                onClick={() => setViewMode('detailed')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'detailed' ? 'bg-gray-800 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Detailed
              </button>
              <button 
                onClick={() => setViewMode('timeline')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'timeline' ? 'bg-gray-800 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Timeline
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl hover:border-gray-700 transition-all text-sm">
              <Filter className="w-4 h-4 text-gray-400" /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl hover:border-gray-700 transition-all text-sm text-gray-300">
              <SortAsc className="w-4 h-4 text-gray-400" /> Sort by
            </button>
            <div className="h-8 w-[1px] bg-gray-800 mx-2 hidden lg:block"></div>
            <div className="flex items-center gap-4 ml-auto lg:ml-0">
              <div className="text-right">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Total Budget</p>
                <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                  ${totalBudget.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <Wallet className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Itinerary Content */}
          <div className="lg:col-span-2 space-y-12 relative">
            
            {/* Timeline Line (Mobile/Left aligned) */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500/50 via-indigo-500/50 to-transparent"></div>

            <AnimatePresence>
              {itinerary.map((day, dIdx) => (
                <motion.div 
                  key={day.day}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative pl-16 md:pl-20"
                >
                  {/* Day Indicator */}
                  <div className="absolute left-0 top-0 flex flex-col items-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-3xl bg-gray-900 border border-gray-800 flex flex-col items-center justify-center shadow-xl z-10 group cursor-default">
                      <span className="text-[10px] text-primary-400 font-black uppercase">Day</span>
                      <span className="text-lg md:text-2xl font-black">{day.day}</span>
                    </div>
                  </div>

                  <div className="mb-6 flex items-baseline gap-4">
                    <h2 className="text-2xl font-bold tracking-tight">Main Activities</h2>
                    <span className="text-sm text-gray-500 font-medium">{day.date}</span>
                  </div>

                  {/* Activity List */}
                  <div className="space-y-6">
                    {day.activities.map((act, aIdx) => (
                      <motion.div 
                        key={act.id}
                        variants={itemVariants}
                        className="group relative"
                      >
                        {/* Connecting Line between activities */}
                        {aIdx < day.activities.length - 1 && (
                          <div className="absolute left-[-26px] top-12 h-12 w-0.5 border-l-2 border-dashed border-gray-800"></div>
                        )}

                        <div className="bg-gray-900/40 border border-gray-800 p-5 rounded-2xl hover:border-primary-500/30 transition-all hover:bg-gray-900/60 flex items-center justify-between group">
                          <div className="flex items-center gap-4 flex-grow">
                            <div className="hidden sm:flex flex-col items-center min-w-[70px]">
                              <Clock className="w-3 h-3 text-gray-600 mb-1" />
                              <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap">{act.time}</span>
                            </div>
                            
                            <div className="h-10 w-1 bg-gray-800 rounded-full group-hover:bg-primary-500 transition-colors"></div>

                            <div>
                              <p className="font-bold text-gray-100 group-hover:text-white transition-colors">{act.activity}</p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <MapPin className="w-3 h-3" /> {act.location}
                                </span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                  act.category === 'Food' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                                  act.category === 'Sightseeing' ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' :
                                  'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                                }`}>
                                  {act.category}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-right min-w-[80px]">
                              <p className="text-[10px] text-gray-600 uppercase font-black">Expense</p>
                              <div className="flex items-center justify-end">
                                <span className="text-gray-500 text-sm mr-1">$</span>
                                <input 
                                  type="number" 
                                  value={act.expense}
                                  onChange={(e) => updateExpense(day.day, act.id, e.target.value)}
                                  className="w-16 bg-transparent font-bold text-gray-100 focus:outline-none focus:text-primary-400 transition-colors text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                              </div>
                            </div>
                            <button className="p-2 text-gray-600 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Hover Arrow Effect - Matching Wireframe Interaction */}
                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                           <ArrowRight className="w-5 h-5 text-primary-500" />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Add Activity Button per Day */}
                  <button className="mt-6 ml-0 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-400 transition-colors">
                    <Plus className="w-4 h-4" /> Add Activity
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Sidebar - Budget Breakdown & Insights */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-8 rounded-[2.5rem] shadow-2xl sticky top-24"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold">Budget Summary</h3>
                <TrendingDown className="w-5 h-5 text-emerald-400" />
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Flights & Transport</span>
                    <span>$840.00</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 w-[60%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Accommodation</span>
                    <span>$1,200.00</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[85%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Activities & Food</span>
                    <span>${totalBudget.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[45%]"></div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Estimated Total</p>
                    <p className="text-3xl font-black text-white">${(totalBudget + 2040).toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-primary-500/10 rounded-2xl border border-primary-500/20">
                    <CreditCard className="w-7 h-7 text-primary-400" />
                  </div>
                </div>
                
                <button className="w-full py-4 bg-white text-black rounded-2xl font-black text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group">
                  Add New Expense <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Quick Stats Card */}
            <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-[2rem] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500/10 rounded-xl">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Trip Duration</p>
                  <p className="font-bold">14 Days Plan</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 uppercase font-bold">Completed</p>
                <p className="font-bold text-primary-400">15%</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ItineraryView;

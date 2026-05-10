import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MapPin, Calendar, DollarSign, Trash2, GripVertical, Plane, Hotel, Navigation, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const BuildItinerary = () => {
  const [sections, setSections] = useState([
    { id: 1, type: 'flight', title: 'Flight to Destination', description: 'Outbound flight details. Include airline, flight number, and terminal information.', startDate: '', endDate: '', budget: '' },
    { id: 2, type: 'hotel', title: 'Check-in at Resort', description: 'Hotel reservation details. Include booking reference and address.', startDate: '', endDate: '', budget: '' },
    { id: 3, type: 'activity', title: 'City Sightseeing Tour', description: 'Guided tour around the historical district.', startDate: '', endDate: '', budget: '' },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addSection = () => {
    const newId = sections.length > 0 ? Math.max(...sections.map(s => s.id)) + 1 : 1;
    setSections([...sections, {
      id: newId,
      type: 'activity',
      title: `New Section ${newId}`,
      description: 'Enter details about this activity, hotel, or travel segment.',
      startDate: '',
      endDate: '',
      budget: ''
    }]);
  };

  const removeSection = (id) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const updateSection = (id, field, value) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const getIconForType = (type) => {
    switch(type) {
      case 'flight': return <Plane className="w-5 h-5 text-indigo-400" />;
      case 'hotel': return <Hotel className="w-5 h-5 text-teal-400" />;
      default: return <Navigation className="w-5 h-5 text-primary-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-32 font-sans relative overflow-hidden">
      
      {/* Dynamic Background Effects */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400 mb-4">
            Build Your Itinerary
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Organize your trip day by day. Add flights, hotels, and activities to create your perfect schedule.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary-500/50 via-indigo-500/50 to-transparent hidden md:block"></div>

          <AnimatePresence>
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: -50, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, scale: 0.9, height: 0 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
                className="relative mb-8 md:pl-20 group"
              >
                {/* Timeline Node */}
                <div className="absolute left-4 top-8 w-5 h-5 rounded-full bg-gray-900 border-4 border-primary-500 z-10 hidden md:flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)] group-hover:scale-125 transition-transform duration-300">
                </div>

                <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 p-6 md:p-8 rounded-[2rem] shadow-xl hover:border-gray-700 transition-colors relative overflow-hidden">
                  
                  {/* Subtle Top Gradient Line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-indigo-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gray-800 rounded-lg">
                          {getIconForType(section.type)}
                        </div>
                        <input 
                          type="text" 
                          value={section.title}
                          onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                          className="bg-transparent text-xl font-bold text-white focus:outline-none focus:border-b border-primary-500 w-full transition-colors"
                          placeholder="Section Title"
                        />
                      </div>
                      <textarea 
                        value={section.description}
                        onChange={(e) => updateSection(section.id, 'description', e.target.value)}
                        className="w-full bg-transparent text-gray-400 text-sm mt-2 resize-none focus:outline-none focus:ring-1 focus:ring-gray-700 rounded-lg p-2 transition-all"
                        rows="2"
                        placeholder="Enter necessary information about this section..."
                      />
                    </div>
                    
                    <button 
                      onClick={() => removeSection(section.id)}
                      className="text-gray-600 hover:text-red-400 p-2 rounded-lg hover:bg-red-400/10 transition-colors self-start"
                      title="Remove section"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Date Range Input */}
                    <div className="flex items-center bg-gray-950/80 border border-gray-800 rounded-xl px-4 py-3 group-hover:border-gray-700 transition-colors">
                      <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                      <div className="flex flex-col w-full">
                        <span className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">Date Range</span>
                        <div className="flex items-center gap-2">
                          <input 
                            type="date" 
                            className="bg-transparent text-sm text-gray-300 focus:outline-none [color-scheme:dark] w-full"
                          />
                          <span className="text-gray-600">to</span>
                          <input 
                            type="date" 
                            className="bg-transparent text-sm text-gray-300 focus:outline-none [color-scheme:dark] w-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Budget Input */}
                    <div className="flex items-center bg-gray-950/80 border border-gray-800 rounded-xl px-4 py-3 group-hover:border-gray-700 transition-colors">
                      <DollarSign className="w-5 h-5 text-gray-500 mr-3" />
                      <div className="flex flex-col w-full">
                        <span className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">Budget Estimate</span>
                        <input 
                          type="text" 
                          placeholder="e.g. $500 or Included"
                          value={section.budget}
                          onChange={(e) => updateSection(section.id, 'budget', e.target.value)}
                          className="bg-transparent text-sm text-gray-300 focus:outline-none w-full"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add Another Section Button */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="md:pl-20 mt-8"
          >
            <button 
              onClick={addSection}
              className="w-full flex items-center justify-center py-5 rounded-[2rem] border-2 border-dashed border-gray-700 text-gray-400 hover:text-white hover:border-primary-500 hover:bg-primary-500/5 transition-all duration-300 group mb-4"
            >
              <Plus className="w-6 h-6 mr-3 group-hover:scale-125 transition-transform duration-300" />
              <span className="text-lg font-medium">Add another Section</span>
            </button>
            <Link 
              to="/search"
              className="w-full flex items-center justify-center py-5 rounded-[2rem] bg-gray-900/50 border border-gray-800 text-primary-400 hover:text-primary-300 hover:bg-gray-800 transition-all duration-300 group"
            >
              <Search className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg font-medium">Explore Activities & Places</span>
            </Link>
          </motion.div>

        </div>

        {/* Bottom Save Action */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 flex justify-end"
        >
          <button className="bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white px-10 py-4 rounded-full font-bold shadow-[0_10px_40px_rgba(79,70,229,0.4)] transition-all transform hover:scale-105">
            Save Itinerary
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default BuildItinerary;

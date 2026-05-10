import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Search, Compass, Star, ArrowRight } from 'lucide-react';

const CreateTrip = () => {
  const [formData, setFormData] = useState({
    place: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const suggestions = [
    { id: 1, title: 'Eiffel Tower', location: 'Paris, France', rating: 4.9, image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=500&auto=format&fit=crop&q=80' },
    { id: 2, title: 'Colosseum', location: 'Rome, Italy', rating: 4.8, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&auto=format&fit=crop&q=80' },
    { id: 3, title: 'Fuji Mountain', location: 'Honshu, Japan', rating: 4.9, image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=500&auto=format&fit=crop&q=80' },
    { id: 4, title: 'Grand Canyon', location: 'Arizona, USA', rating: 4.8, image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=500&auto=format&fit=crop&q=80' },
    { id: 5, title: 'Santorini Coast', location: 'Santorini, Greece', rating: 4.7, image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac542?w=500&auto=format&fit=crop&q=80' },
    { id: 6, title: 'Machu Picchu', location: 'Cusco Region, Peru', rating: 4.9, image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=500&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24 font-sans relative overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="fixed top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none z-0"></div>
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
        className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        


        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          
          {/* Plan a new trip section */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400 mb-8">
              Plan a new trip
            </h2>
            
            <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
              {/* Subtle hover glow inside the form container */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <form className="max-w-3xl space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <label className="md:col-span-3 text-gray-300 font-medium text-lg flex items-center">
                    <MapPin className="w-5 h-5 mr-3 text-primary-400" /> Select a Place :
                  </label>
                  <div className="md:col-span-9 relative">
                    <input
                      type="text"
                      name="place"
                      value={formData.place}
                      onChange={handleChange}
                      placeholder="e.g. Paris, Tokyo, New York"
                      className="w-full bg-gray-950/80 border border-gray-700 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all shadow-inner placeholder-gray-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <label className="md:col-span-3 text-gray-300 font-medium text-lg flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-primary-400" /> Start Date :
                  </label>
                  <div className="md:col-span-9 relative">
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full bg-gray-950/80 border border-gray-700 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all shadow-inner [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <label className="md:col-span-3 text-gray-300 font-medium text-lg flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-primary-400" /> End Date :
                  </label>
                  <div className="md:col-span-9 relative">
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full bg-gray-950/80 border border-gray-700 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all shadow-inner [color-scheme:dark]"
                    />
                  </div>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-12 opacity-50"></motion.div>

          {/* Suggestions Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-8">
              <h3 className="text-2xl font-semibold text-white mr-4">Suggestion for Places to Visit / Activities to perform</h3>
              <div className="h-px bg-gray-800 flex-grow"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {suggestions.map((item) => (
                <motion.div 
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative h-[400px] rounded-[2rem] overflow-hidden cursor-pointer group border border-gray-800 shadow-2xl"
                >
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  
                  {/* Dark gradient overlay that intensifies on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                  
                  {/* Rating badge */}
                  <div className="absolute top-5 right-5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center shadow-lg">
                    <Star className="w-3.5 h-3.5 text-amber-400 mr-1.5 fill-amber-400" />
                    <span className="text-sm text-white font-bold">{item.rating}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="flex items-center mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <Compass className="text-primary-400 w-4 h-4 mr-2" />
                      <p className="text-primary-300 text-sm font-semibold uppercase tracking-wider">Top Recommendation</p>
                    </div>
                    <h4 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{item.title}</h4>
                    <p className="text-gray-300 flex items-center drop-shadow-md">
                      <MapPin className="w-4 h-4 mr-1.5 opacity-70" />
                      {item.location}
                    </p>
                    
                    {/* Hover reveal button */}
                    <button className="mt-6 w-full flex items-center justify-center py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                      Add to Itinerary <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default CreateTrip;

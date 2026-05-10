import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Calendar, MapPin, Settings, User, Bell } from 'lucide-react';

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <span className="text-xl font-bold text-gradient">Traveloop</span>
        </div>
        <div className="p-4 flex-1">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center px-4 py-3 bg-primary-50 text-primary-600 rounded-xl font-medium">
                <Compass className="mr-3" size={20} />
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                <Calendar className="mr-3" size={20} />
                My Trips
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                <MapPin className="mr-3" size={20} />
                Saved Places
              </a>
            </li>
            <div className="pt-8 pb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Account</div>
            <li>
              <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                <User className="mr-3" size={20} />
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                <Settings className="mr-3" size={20} />
                Settings
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sm:px-8">
          <h1 className="text-xl font-semibold text-gray-800">Overview</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Bell size={20} />
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary-500 to-indigo-500 border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-xs">
              JD
            </div>
          </div>
        </header>

        <div className="p-6 sm:p-8 flex-1 overflow-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {/* Dashboard Cards */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
              <span className="text-gray-500 text-sm font-medium mb-1">Upcoming Trips</span>
              <span className="text-3xl font-bold text-gray-900 mb-4">2</span>
              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-sm text-primary-600 font-medium">
                <span>View itineraries</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
              <span className="text-gray-500 text-sm font-medium mb-1">Places Visited</span>
              <span className="text-3xl font-bold text-gray-900 mb-4">14</span>
              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-sm text-gray-500">
                <span>Last visited: Kyoto, Japan</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-600 to-indigo-700 p-6 rounded-2xl shadow-md text-white flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full opacity-10 -mr-10 -mt-10"></div>
              <span className="text-primary-100 text-sm font-medium mb-1 relative z-10">Traveloop Pro</span>
              <span className="text-2xl font-bold mb-4 relative z-10">Unlock premium features</span>
              <button className="mt-auto bg-white text-primary-700 py-2 rounded-xl font-medium text-sm w-max px-4 hover:bg-gray-50 transition-colors relative z-10">
                Upgrade Now
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Compass className="text-gray-400" size={28} />
              </div>
              <h3 className="text-gray-900 font-medium mb-1">No recent trips</h3>
              <p className="text-gray-500 text-sm max-w-sm">When you book or plan a trip, your itinerary and updates will appear here.</p>
              <button className="mt-6 bg-primary-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-primary-700 transition-colors">
                Plan a New Trip
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

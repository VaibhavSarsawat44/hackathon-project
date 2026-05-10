import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAuthRoute = location.pathname === '/dashboard' || location.pathname === '/create-trip' || location.pathname === '/build-itinerary' || location.pathname === '/my-trips' || location.pathname === '/profile';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gradient tracking-tight">
              Traveloop
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthRoute && (
              <>
                <Link to="/" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Home</Link>
                <a href="#features" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Features</a>
              </>
            )}
            <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Dashboard</Link>
            <Link to="/my-trips" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">My Trips</Link>
            
            <div className="flex items-center space-x-4 ml-4 border-l border-gray-200 pl-4">
              {!isAuthRoute ? (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Log in</Link>
                  <Link to="/register" className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-full font-medium transition-colors shadow-lg shadow-primary-500/30">
                    Get Started
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-10 h-10 rounded-full border-2 border-primary-100 bg-gray-100 overflow-hidden cursor-pointer hover:border-primary-500 transition-colors shadow-sm block focus:outline-none"
                  >
                    <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden py-1 z-50"
                      >
                        <Link 
                          to="/profile" 
                          onClick={() => setIsDropdownOpen(false)}
                          className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          Account
                        </Link>
                        <Link 
                          to="/login" 
                          onClick={() => setIsDropdownOpen(false)}
                          className="block px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Log out
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass absolute w-full left-0 top-full shadow-xl border-t border-gray-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              {!isAuthRoute && (
                <>
                  <Link to="/" className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg">Home</Link>
                  <a href="#features" className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg">Features</a>
                </>
              )}
              <Link to="/dashboard" className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg">Dashboard</Link>
              <Link to="/my-trips" className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg">My Trips</Link>
              <div className="h-px bg-gray-200 my-2"></div>
              {!isAuthRoute ? (
                <>
                  <Link to="/login" className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary-600">Log in</Link>
                  <Link to="/register" className="block w-full text-center mt-2 bg-primary-600 text-white px-5 py-3 rounded-xl font-medium shadow-md">
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 px-3 py-3 hover:bg-primary-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 rounded-full border-2 border-primary-100 bg-gray-100 overflow-hidden shadow-sm">
                      <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-medium text-gray-700">Account</span>
                  </Link>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">Log out</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

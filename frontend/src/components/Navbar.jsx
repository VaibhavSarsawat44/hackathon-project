import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAuthRoute = location.pathname === '/dashboard' || location.pathname === '/create-trip' || location.pathname === '/build-itinerary' || location.pathname === '/my-trips' || location.pathname === '/profile' || location.pathname === '/search' || location.pathname === '/invoice' || location.pathname === '/packing-checklist' || location.pathname === '/itinerary';
  const showAppLinks = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register';

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
            {showAppLinks && (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Dashboard</Link>
                <Link to="/my-trips" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">My Trips</Link>
                <Link to="/search" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Explore</Link>
              </>
            )}
            <div className="flex items-center space-x-4 ml-4 border-l border-gray-200 pl-4">
              {!isAuthRoute ? (
                <>

                  <Link to="/register" className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-full font-medium transition-colors shadow-lg shadow-primary-500/30">
                    Get Started
                  </Link>
                </>
              ) : (
                <div className="relative" ref={profileMenuRef}>
                  <button 
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="w-10 h-10 rounded-full border-2 border-primary-100 bg-primary-50 flex items-center justify-center text-primary-600 hover:border-primary-500 transition-colors shadow-sm"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 6h14" />
                      <path d="M12 6v14" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden"
                      >
                        <Link 
                          to="/profile" 
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          <User className="w-4 h-4 mr-3" />
                          Account
                        </Link>
                        <div className="h-px bg-gray-100 my-1"></div>
                        <Link 
                          to="/login" 
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
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
              {showAppLinks && (
                <>
                  <Link to="/dashboard" className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg">Dashboard</Link>
                  <Link to="/my-trips" className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg">My Trips</Link>
                  <Link to="/search" className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg">Explore</Link>
                </>
              )}
              <div className="h-px bg-gray-200 my-2"></div>
              {!isAuthRoute ? (
                <>

                  <Link to="/register" className="block w-full text-center mt-2 bg-primary-600 text-white px-5 py-3 rounded-xl font-medium shadow-md">
                    Get Started
                  </Link>
                </>
              ) : (
                <div className="flex flex-col space-y-1 pt-2 border-t border-gray-100 mt-2">
                  <div className="flex items-center space-x-3 px-3 py-3 mb-2 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full border-2 border-primary-100 bg-primary-100 flex items-center justify-center text-primary-600 shadow-sm">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 6h14" />
                        <path d="M12 6v14" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">Traveler</p>
                      <p className="text-xs text-gray-500">My Account</p>
                    </div>
                  </div>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                    <User className="w-5 h-5 mr-3" />
                    Account
                  </Link>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut className="w-5 h-5 mr-3" />
                    Log out
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

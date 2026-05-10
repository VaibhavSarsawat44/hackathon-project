import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Lock, ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMouseMove = (e) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Animated Background Particles/Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 -left-48 w-[600px] h-[600px] bg-primary-600 rounded-full blur-[150px] mix-blend-screen"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 -right-48 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[150px] mix-blend-screen"
      />

      <motion.div 
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      >
        <h2 className="mt-6 text-center text-4xl font-black text-white drop-shadow-lg">
          Welcome Back
        </h2>
        <p className="mt-3 text-center text-sm text-gray-200">
          New here?{' '}
          <Link to="/register" className="font-medium text-primary-400 hover:text-primary-300 transition-colors relative group">
            Create an account
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 transition-all group-hover:w-full"></span>
          </Link>
        </p>
      </motion.div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 perspective-1000">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 150 }}
          onMouseMove={handleMouseMove}
          className="relative bg-gray-900/60 backdrop-blur-2xl py-12 px-4 shadow-2xl sm:rounded-[2.5rem] sm:px-10 flex flex-col items-center overflow-hidden border border-gray-700/50 group"
        >
          {/* Mouse tracking glow effect */}
          <div 
            className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(14, 165, 233, 0.1), transparent 40%)`
            }}
          />

          <motion.form 
            className="space-y-7 w-full relative z-10" 
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Interactive Photo Avatar */}
            <motion.div variants={itemVariants} className="flex justify-center mb-10">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-28 h-28 rounded-full border-2 border-gray-600 bg-gray-800 flex items-center justify-center relative overflow-hidden group/avatar shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-colors hover:border-primary-500 hover:shadow-[0_0_30px_rgba(14,165,233,0.3)]"
              >
                <motion.span 
                  className="text-gray-400 font-medium z-10"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  Photo
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Username Input */}
            <motion.div variants={itemVariants} className="relative group/input">
              <div className={`absolute inset-0 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-2xl blur opacity-0 transition-opacity duration-300 ${focusedInput === 'username' ? 'opacity-30' : 'group-hover/input:opacity-20'}`}></div>
              <div className="relative rounded-2xl shadow-sm bg-gray-950/80 border border-gray-700 overflow-hidden flex items-center transition-colors focus-within:border-primary-500">
                <div className="pl-4 flex items-center pointer-events-none text-gray-400 z-10">
                  <User className={`h-5 w-5 transition-colors ${focusedInput === 'username' ? 'text-primary-400' : ''}`} />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onFocus={() => setFocusedInput('username')}
                  onBlur={() => setFocusedInput(null)}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-3 pr-4 py-4 bg-transparent text-white sm:text-sm outline-none placeholder-gray-500 [&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s] [&:-webkit-autofill]:[-webkit-text-fill-color:white] relative z-10"
                  placeholder="Username"
                />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div variants={itemVariants} className="relative group/input">
              <div className={`absolute inset-0 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-2xl blur opacity-0 transition-opacity duration-300 ${focusedInput === 'password' ? 'opacity-30' : 'group-hover/input:opacity-20'}`}></div>
              <div className="relative rounded-2xl shadow-sm bg-gray-950/80 border border-gray-700 overflow-hidden flex items-center transition-colors focus-within:border-primary-500">
                <div className="pl-4 flex items-center pointer-events-none text-gray-400 z-10">
                  <Lock className={`h-5 w-5 transition-colors ${focusedInput === 'password' ? 'text-primary-400' : ''}`} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-3 pr-4 py-4 bg-transparent text-white sm:text-sm outline-none placeholder-gray-500 [&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s] [&:-webkit-autofill]:[-webkit-text-fill-color:white] relative z-10"
                  placeholder="Password"
                />
              </div>
            </motion.div>

            {/* Login Button */}
            <motion.div variants={itemVariants} className="pt-4 flex justify-center w-full">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-2/3 relative flex justify-center items-center py-4 px-4 rounded-2xl font-bold text-white bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary-500 overflow-hidden group/btn shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all"
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                
                <span className="relative z-10 flex items-center">
                  Login Securely
                  <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                </span>
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
      
      {/* Add keyframes for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Login;

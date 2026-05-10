import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Lock, Camera } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations matching our premium theme but adjusted for the dark wireframe look */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary-600 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-20"></div>

      <motion.div 
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Login Screen
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Or{' '}
          <Link to="/register" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
            create a new account
          </Link>
        </p>
      </motion.div>

      <motion.div 
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="bg-gray-800/60 backdrop-blur-xl py-10 px-4 shadow-2xl border border-gray-700 sm:rounded-3xl sm:px-10 flex flex-col items-center">
          
          {/* Photo Placeholder */}
          <div className="w-24 h-24 rounded-full border-2 border-gray-600 bg-gray-700/50 flex items-center justify-center mb-8 relative overflow-hidden group cursor-pointer hover:border-primary-500 transition-colors">
            <span className="text-gray-400 font-medium z-10 group-hover:hidden">Photo</span>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white w-6 h-6" />
            </div>
          </div>

          <form className="space-y-6 w-full" onSubmit={handleSubmit}>
            <div>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-900/50 focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-600 text-white rounded-xl py-3 border outline-none transition-shadow hover:bg-gray-900 placeholder-gray-500"
                  placeholder="Username"
                />
              </div>
            </div>

            <div>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-900/50 focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-600 text-white rounded-xl py-3 border outline-none transition-shadow hover:bg-gray-900 placeholder-gray-500"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                className="w-1/2 flex justify-center py-3 px-4 border border-gray-600 rounded-xl shadow-sm text-sm font-medium text-gray-200 bg-gray-800 hover:bg-gray-700 hover:text-white hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary-500 transition-all"
              >
                Login Button
              </button>
            </div>
          </form>

        </div>
      </motion.div>
    </div>
  );
};

export default Login;

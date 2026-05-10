import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    additionalInfo: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations matching the dark wireframe look */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-primary-600 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-20"></div>

      <motion.div 
        className="sm:mx-auto sm:w-full sm:max-w-2xl relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Registration Screen
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
            Log in here
          </Link>
        </p>
      </motion.div>

      <motion.div 
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="bg-gray-800/60 backdrop-blur-xl py-10 px-4 sm:px-10 shadow-2xl border border-gray-700 sm:rounded-3xl flex flex-col items-center">
          
          {/* Photo Placeholder */}
          <div className="w-24 h-24 rounded-full border-2 border-gray-600 bg-gray-700/50 flex items-center justify-center mb-8 relative overflow-hidden group cursor-pointer hover:border-primary-500 transition-colors">
            <span className="text-gray-400 font-medium z-10 group-hover:hidden">Photo</span>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white w-6 h-6" />
            </div>
          </div>

          <form className="w-full" onSubmit={handleSubmit}>
            <div className="border border-gray-600 rounded-2xl p-6 mb-8 bg-gray-900/30">
              
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 mb-6">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-gray-900/50 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-600 text-white rounded-xl py-3 px-4 border outline-none transition-shadow hover:bg-gray-900 placeholder-gray-500"
                    placeholder="First Name"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-gray-900/50 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-600 text-white rounded-xl py-3 px-4 border outline-none transition-shadow hover:bg-gray-900 placeholder-gray-500"
                    placeholder="Last Name"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-900/50 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-600 text-white rounded-xl py-3 px-4 border outline-none transition-shadow hover:bg-gray-900 placeholder-gray-500"
                    placeholder="Email Address"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-gray-900/50 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-600 text-white rounded-xl py-3 px-4 border outline-none transition-shadow hover:bg-gray-900 placeholder-gray-500"
                    placeholder="Phone Number"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="bg-gray-900/50 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-600 text-white rounded-xl py-3 px-4 border outline-none transition-shadow hover:bg-gray-900 placeholder-gray-500"
                    placeholder="City"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="bg-gray-900/50 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-600 text-white rounded-xl py-3 px-4 border outline-none transition-shadow hover:bg-gray-900 placeholder-gray-500"
                    placeholder="Country"
                  />
                </div>
              </div>

              <div>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows={4}
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="bg-gray-900/50 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-600 text-white rounded-xl py-3 px-4 border outline-none transition-shadow hover:bg-gray-900 placeholder-gray-500 resize-none"
                  placeholder="Additional Information ...."
                />
              </div>

            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="flex justify-center py-3 px-8 border border-gray-500 rounded-xl shadow-sm text-sm font-medium text-gray-200 bg-gray-800 hover:bg-gray-700 hover:text-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary-500 transition-all border-dashed"
              >
                Register Users
              </button>
            </div>
          </form>

        </div>
      </motion.div>
    </div>
  );
};

export default Register;

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight, Upload, X, Image as ImageIcon } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    country: '',
    additionalInfo: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [focusedInput, setFocusedInput] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Photo & Camera States
  const [photo, setPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const name = `${formData.firstName} ${formData.lastName}`.trim();
      const payload = {
        name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        city: formData.city,
        country: formData.country,
        additionalInfo: formData.additionalInfo,
        profilePhoto: photo || ''
      };

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Camera Functions
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    if (!isModalOpen) {
      stopCamera();
    }
  }, [isModalOpen]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error("Error accessing camera: ", err);
      alert("Could not access camera. Please check permissions.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const dataUrl = canvasRef.current.toDataURL('image/png');
      setPhoto(dataUrl);
      stopCamera();
      setIsModalOpen(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target.result);
        setIsModalOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Animated Background Particles/Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
      
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -right-48 w-[700px] h-[700px] bg-primary-600 rounded-full blur-[150px] mix-blend-screen pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.4, 0.15],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 -left-48 w-[700px] h-[700px] bg-indigo-600 rounded-full blur-[150px] mix-blend-screen pointer-events-none"
      />

      <motion.div 
        className="sm:mx-auto sm:w-full sm:max-w-2xl relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      >
        <h2 className="mt-6 text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">
          Create an Account
        </h2>
        <p className="mt-3 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-400 hover:text-primary-300 transition-colors relative group">
            Log in here
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 transition-all group-hover:w-full"></span>
          </Link>
        </p>
      </motion.div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl relative z-10 perspective-1000">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 150 }}
          onMouseMove={handleMouseMove}
          className="relative bg-gray-900/60 backdrop-blur-2xl py-10 px-4 sm:px-10 shadow-2xl sm:rounded-[2.5rem] flex flex-col items-center overflow-hidden border border-gray-700/50 group"
        >
          {/* Mouse tracking glow effect */}
          <div 
            className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(14, 165, 233, 0.08), transparent 40%)`
            }}
          />

          <motion.form 
            className="w-full relative z-10" 
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Interactive Photo Avatar */}
            <motion.div variants={itemVariants} className="flex justify-center mb-8">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="w-28 h-28 rounded-full border-2 border-gray-600 bg-gray-800 flex items-center justify-center relative overflow-hidden group/avatar cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-colors hover:border-primary-500 hover:shadow-[0_0_30px_rgba(14,165,233,0.3)]"
              >
                {photo ? (
                  <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <motion.span 
                    className="text-gray-400 font-medium z-10 transition-opacity group-hover/avatar:opacity-0"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Photo
                  </motion.span>
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/80 to-indigo-600/80 flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 transform translate-y-full group-hover/avatar:translate-y-0">
                  <Camera className="text-white w-8 h-8 mb-1" />
                  <span className="text-xs text-white font-medium">Upload</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="border border-gray-700/60 rounded-3xl p-6 md:p-8 mb-8 bg-gray-900/40 shadow-inner relative overflow-hidden group/box">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-indigo-500/5 opacity-0 group-hover/box:opacity-100 transition-opacity duration-500"></div>
              
              <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 mb-6 relative z-10">
                {[
                  { name: 'firstName', placeholder: 'First Name', type: 'text' },
                  { name: 'lastName', placeholder: 'Last Name', type: 'text' },
                  { name: 'email', placeholder: 'Email Address', type: 'email' },
                  { name: 'password', placeholder: 'Password', type: 'password' },
                  { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
                  { name: 'city', placeholder: 'City', type: 'text' },
                  { name: 'country', placeholder: 'Country', type: 'text' },
                ].map((field) => (
                  <div key={field.name} className="relative group/input">
                    <div className={`absolute inset-0 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-xl blur opacity-0 transition-opacity duration-300 ${focusedInput === field.name ? 'opacity-30' : 'group-hover/input:opacity-20'}`}></div>
                    <div className="relative rounded-xl shadow-sm bg-gray-950/80 border border-gray-700 overflow-hidden flex items-center transition-colors focus-within:border-primary-500">
                      <input
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        value={formData[field.name]}
                        onFocus={() => setFocusedInput(field.name)}
                        onBlur={() => setFocusedInput(null)}
                        onChange={handleChange}
                        className="block w-full px-4 py-3.5 bg-transparent text-white sm:text-sm outline-none placeholder-gray-500 transition-all focus:bg-gray-900 [&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                        placeholder={field.placeholder}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative group/input z-10 mt-2">
                <div className={`absolute inset-0 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-xl blur opacity-0 transition-opacity duration-300 ${focusedInput === 'additionalInfo' ? 'opacity-30' : 'group-hover/input:opacity-20'}`}></div>
                <div className="relative rounded-xl shadow-sm bg-gray-950/80 border border-gray-700 overflow-hidden flex items-center transition-colors focus-within:border-primary-500">
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    rows={4}
                    value={formData.additionalInfo}
                    onFocus={() => setFocusedInput('additionalInfo')}
                    onBlur={() => setFocusedInput(null)}
                    onChange={handleChange}
                    className="block w-full px-4 py-4 bg-transparent text-white sm:text-sm outline-none placeholder-gray-500 resize-none transition-all focus:bg-gray-900"
                    placeholder="Additional Information ...."
                  />
                </div>
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-red-500 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center w-full">
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-1/2 relative flex justify-center items-center py-4 px-4 rounded-2xl font-bold text-white bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary-500 overflow-hidden group/btn shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                
                <span className="relative z-10 flex items-center">
                  Register Users
                  <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                </span>
              </motion.button>
            </motion.div>
          </motion.form>

        </motion.div>
      </div>

      {/* Photo Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-900 border border-gray-700 rounded-3xl p-6 w-full max-w-sm flex flex-col items-center relative shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h3 className="text-xl font-bold text-white mb-6">Profile Photo</h3>
              
              <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-800 border-4 border-gray-700 mb-6 relative flex items-center justify-center">
                {isCameraActive ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover transform scale-x-[-1]"
                  />
                ) : photo ? (
                  <img src={photo} alt="Current" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-16 h-16 text-gray-600" />
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                className="hidden" 
              />

              {isCameraActive ? (
                <div className="flex gap-4 w-full">
                  <button 
                    onClick={capturePhoto}
                    className="flex-1 py-3 px-4 rounded-xl font-medium text-white bg-primary-600 hover:bg-primary-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    Capture
                  </button>
                  <button 
                    onClick={stopCamera}
                    className="flex-1 py-3 px-4 rounded-xl font-medium text-white bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex gap-4 w-full">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 py-3 px-4 rounded-xl font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Update Photo
                  </button>
                  <button 
                    onClick={startCamera}
                    className="flex-1 py-3 px-4 rounded-xl font-medium text-white bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    Camera
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Add keyframes for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Register;

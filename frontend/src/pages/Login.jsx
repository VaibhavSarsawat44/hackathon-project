import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Lock, Camera, ArrowRight, Upload, X, Image as ImageIcon } from 'lucide-react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = '/dashboard';
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
                onClick={() => setIsModalOpen(true)}
                className="w-28 h-28 rounded-full border-2 border-gray-600 bg-gray-800 flex items-center justify-center relative overflow-hidden group/avatar cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-colors hover:border-primary-500 hover:shadow-[0_0_30px_rgba(14,165,233,0.3)]"
              >
                {photo ? (
                  <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <motion.span 
                    className="text-gray-400 font-medium z-10 transition-opacity"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Photo
                  </motion.span>
                )}
              </motion.div>
            </motion.div>

            {/* Username Input */}
            <motion.div variants={itemVariants} className="relative group/input">
              <div className={`absolute inset-0 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-2xl blur opacity-0 transition-opacity duration-300 ${focusedInput === 'username' ? 'opacity-30' : 'group-hover/input:opacity-20'}`}></div>
              <div className="relative rounded-2xl shadow-sm bg-gray-950/80 border border-gray-700 overflow-hidden flex items-center transition-colors focus-within:border-primary-500">
                <div className="pl-4 flex items-center pointer-events-none text-gray-400">
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
                  className="block w-full pl-3 pr-4 py-4 bg-transparent text-white sm:text-sm outline-none placeholder-gray-500"
                  placeholder="Username"
                />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div variants={itemVariants} className="relative group/input">
              <div className={`absolute inset-0 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-2xl blur opacity-0 transition-opacity duration-300 ${focusedInput === 'password' ? 'opacity-30' : 'group-hover/input:opacity-20'}`}></div>
              <div className="relative rounded-2xl shadow-sm bg-gray-950/80 border border-gray-700 overflow-hidden flex items-center transition-colors focus-within:border-primary-500">
                <div className="pl-4 flex items-center pointer-events-none text-gray-400">
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
                  className="block w-full pl-3 pr-4 py-4 bg-transparent text-white sm:text-sm outline-none placeholder-gray-500"
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

export default Login;

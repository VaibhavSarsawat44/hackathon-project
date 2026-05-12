import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, Edit3, MapPin, Calendar, Mail, Phone, Globe, ArrowRight, Briefcase, User, Lock, X } from 'lucide-react';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passForm, setPassForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login';
          return;
        }

        const res = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        
        if (data.success) {
          setUserData(data.data.user);
          setEditForm({
            name: data.data.user.name || '',
            bio: data.data.user.bio || '',
            phone: data.data.user.phone || '',
            city: data.data.user.city || '',
            country: data.data.user.country || ''
          });
        } else {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });
      const data = await res.json();
      if (data.success) {
        setUserData(data.data.user);
        setIsEditing(false);
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (err) {
      alert('Error updating profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');
    if (passForm.newPassword !== passForm.confirmPassword) {
      setPassError('New passwords do not match');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passForm.currentPassword,
          newPassword: passForm.newPassword
        })
      });
      const data = await res.json();
      if (data.success) {
        setPassSuccess('Password changed successfully');
        localStorage.setItem('token', data.data.token);
        setPassForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => {
          setIsPasswordModalOpen(false);
          setPassSuccess('');
        }, 2000);
      } else {
        setPassError(data.message || 'Failed to change password');
      }
    } catch (err) {
      setPassError('An error occurred');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
        <p className="text-xl mb-4 text-red-400">{error || 'Could not load profile'}</p>
        <button onClick={() => window.location.reload()} className="bg-primary-600 px-6 py-2 rounded-full">Retry</button>
      </div>
    );
  }

  const preplannedTrips = [
    { id: 1, title: 'Tokyo Adventure', location: 'Tokyo, Japan', date: 'Dec 2025', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&auto=format&fit=crop&q=80' },
    { id: 2, title: 'Safari Expedition', location: 'Serengeti, Tanzania', date: 'Feb 2026', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&auto=format&fit=crop&q=80' },
  ];

  const previousTrips = [
    { id: 4, title: 'Parisian Getaway', location: 'Paris, France', date: 'Sep 2024', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=500&auto=format&fit=crop&q=80' },
  ];

  const TripCard = ({ trip }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative h-72 rounded-2xl overflow-hidden cursor-pointer group border border-gray-800 shadow-xl"
    >
      <img src={trip.image} alt={trip.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity"></div>
      
      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center">
        <Calendar className="w-3.5 h-3.5 text-gray-300 mr-1.5" />
        <span className="text-xs text-gray-200 font-medium">{trip.date}</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 transform transition-transform duration-300 group-hover:-translate-y-2">
        <h4 className="text-lg font-bold text-white mb-1">{trip.title}</h4>
        <p className="text-gray-400 text-sm flex items-center mb-4">
          <MapPin className="w-3.5 h-3.5 mr-1.5 text-primary-400" /> {trip.location}
        </p>
        <Link 
          to="/build-itinerary"
          className="w-full flex items-center justify-center py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          View <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-32 font-sans relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-1/4 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          {/* ─── Profile Header ────────────────────────────────────────── */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 p-8 md:p-10 rounded-[2rem] shadow-2xl mb-12 relative overflow-hidden"
          >
            {/* Decorative top gradient line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-indigo-500"></div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              <div className="relative group flex-shrink-0">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-gray-700 overflow-hidden shadow-[0_0_30px_rgba(79,70,229,0.2)] group-hover:border-primary-500 transition-colors duration-300 flex items-center justify-center bg-gray-800"
                >
                  {userData.profilePhoto ? (
                    <img src={userData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-16 h-16 md:w-20 md:h-20 text-gray-400" />
                  )}
                </motion.div>
                {isEditing && (
                  <button className="absolute bottom-1 right-1 w-10 h-10 bg-primary-600 hover:bg-primary-500 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-lg transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>

              {/* User Details */}
              <div className="flex-grow text-center md:text-left w-full">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4 justify-between">
                  {isEditing ? (
                    <input 
                      className="text-3xl font-bold bg-gray-800 text-white border border-gray-700 rounded px-3 py-1 outline-none w-full md:max-w-xs focus:border-primary-500"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      placeholder="Your Name"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
                  )}
                  
                  <div className="flex gap-3 self-center md:self-auto flex-wrap justify-center">
                    <button 
                      onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                      disabled={isSaving}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${isEditing ? 'bg-primary-600 border-primary-500 text-white hover:bg-primary-500' : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'}`}
                    >
                      <Edit3 className="w-3.5 h-3.5 inline mr-1.5" />
                      {isEditing ? (isSaving ? 'Saving...' : 'Save Changes') : 'Edit Profile'}
                    </button>
                    {!isEditing && (
                      <button 
                        onClick={() => setIsPasswordModalOpen(true)}
                        className="px-4 py-1.5 rounded-full text-sm font-medium border bg-transparent border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-500 hover:text-indigo-300 transition-all flex items-center"
                      >
                        <Lock className="w-3.5 h-3.5 inline mr-1.5" />
                        Password
                      </button>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="px-4 py-1.5 rounded-full text-sm font-medium border bg-transparent border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:text-red-300 transition-all flex items-center"
                    >
                      Log out
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <textarea 
                    className="w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-xl px-4 py-3 mb-4 outline-none resize-none focus:border-primary-500"
                    rows="3"
                    value={editForm.bio}
                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-400 mb-5 max-w-xl leading-relaxed">{userData.bio || 'No bio provided yet.'}</p>
                )}

                <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-4 text-sm text-gray-400">
                  <span className="flex items-center"><Mail className="w-4 h-4 mr-2 text-indigo-400" /> {userData.email}</span>
                  
                  <span className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-teal-400" /> 
                    {isEditing ? (
                      <input className="bg-gray-800 text-white px-3 py-1.5 rounded-lg w-36 border border-gray-700 focus:border-primary-500 outline-none" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} placeholder="Phone" />
                    ) : (userData.phone || 'No phone number')}
                  </span>
                  
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-primary-400" /> 
                    {isEditing ? (
                      <div className="flex gap-2">
                        <input className="bg-gray-800 text-white px-3 py-1.5 rounded-lg w-28 border border-gray-700 focus:border-primary-500 outline-none" value={editForm.city} onChange={e => setEditForm({...editForm, city: e.target.value})} placeholder="City" />
                        <input className="bg-gray-800 text-white px-3 py-1.5 rounded-lg w-28 border border-gray-700 focus:border-primary-500 outline-none" value={editForm.country} onChange={e => setEditForm({...editForm, country: e.target.value})} placeholder="Country" />
                      </div>
                    ) : (userData.city || userData.country ? `${userData.city}${userData.city && userData.country ? ', ' : ''}${userData.country}` : 'Location unknown')}
                  </span>
                  
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-amber-400" /> 
                    Joined {new Date(userData.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-800">
              {[
                { label: 'Total Trips', value: (userData.savedDestinations?.length || 0) + preplannedTrips.length + previousTrips.length, icon: <Briefcase className="w-5 h-5 text-primary-400" /> },
                { label: 'Saved Destinations', value: userData.savedDestinations?.length || 0, icon: <Globe className="w-5 h-5 text-indigo-400" /> },
                { label: 'Planned', value: preplannedTrips.length, icon: <Calendar className="w-5 h-5 text-teal-400" /> },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -4 }}
                  className="text-center p-4 rounded-2xl bg-gray-950/50 border border-gray-800 hover:border-gray-700 transition-colors cursor-default"
                >
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ─── Preplanned Trips ──────────────────────────────────────── */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-semibold text-white mr-4">Preplanned Trips</h2>
              <div className="h-px bg-gray-800 flex-grow"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {preplannedTrips.map(trip => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </motion.div>

          {/* ─── Previous Trips ────────────────────────────────────────── */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-semibold text-white mr-4">Previous Trips</h2>
              <div className="h-px bg-gray-800 flex-grow"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {previousTrips.map(trip => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Password Modal */}
      <AnimatePresence>
        {isPasswordModalOpen && (
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
              className="bg-gray-900 border border-gray-700 rounded-3xl p-6 md:p-8 w-full max-w-md relative shadow-2xl"
            >
              <button 
                onClick={() => setIsPasswordModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h3 className="text-2xl font-bold text-white mb-6">Update Password</h3>
              
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Current Password</label>
                  <div className="relative rounded-xl shadow-sm bg-gray-950 border border-gray-700 overflow-hidden flex items-center transition-colors focus-within:border-primary-500">
                    <input
                      type="password"
                      required
                      value={passForm.currentPassword}
                      onChange={(e) => setPassForm({...passForm, currentPassword: e.target.value})}
                      className="block w-full px-4 py-3 bg-transparent text-white outline-none"
                      placeholder="Enter current password"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">New Password</label>
                  <div className="relative rounded-xl shadow-sm bg-gray-950 border border-gray-700 overflow-hidden flex items-center transition-colors focus-within:border-primary-500">
                    <input
                      type="password"
                      required
                      value={passForm.newPassword}
                      onChange={(e) => setPassForm({...passForm, newPassword: e.target.value})}
                      className="block w-full px-4 py-3 bg-transparent text-white outline-none"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Confirm New Password</label>
                  <div className="relative rounded-xl shadow-sm bg-gray-950 border border-gray-700 overflow-hidden flex items-center transition-colors focus-within:border-primary-500">
                    <input
                      type="password"
                      required
                      value={passForm.confirmPassword}
                      onChange={(e) => setPassForm({...passForm, confirmPassword: e.target.value})}
                      className="block w-full px-4 py-3 bg-transparent text-white outline-none"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                {passError && <p className="text-red-500 text-sm">{passError}</p>}
                {passSuccess && <p className="text-green-500 text-sm">{passSuccess}</p>}

                <button
                  type="submit"
                  className="w-full mt-4 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 transition-all shadow-lg"
                >
                  Update Password
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default UserProfile;

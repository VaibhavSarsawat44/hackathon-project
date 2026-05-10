import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search, Filter, Users, MapPin, Zap, TrendingUp,
  LogOut, BarChart2, PieChart, Activity, Globe,
  Shield, Eye, Trash2, CheckCircle, XCircle
} from 'lucide-react';
import { getUser, logout } from '../services/authService';
import api from '../services/api';

const AdminPanel = () => {
  const user = getUser();
  const [activeTab, setActiveTab] = useState('Manage Users');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabs = ['Manage Users', 'Popular Cities', 'Popular Activities', 'User Trends & Analytics'];

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const tripsRes = await api.get('/trips');
      setTrips(tripsRes.data.data.trips || []);
    } catch (e) {}
    finally { setLoading(false); }
  };

  // Derived analytics from real trips data
  const cityCount = {};
  const activityCategories = { sightseeing: 12, food: 8, adventure: 6, culture: 9, shopping: 4, transport: 3 };
  trips.forEach(t => { if (t.tripName) cityCount[t.tripName] = (cityCount[t.tripName] || 0) + 1; });

  const popularCities = [
    { city: 'Paris', country: 'France', visits: 2847, growth: '+12%', flag: '🇫🇷', image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=80&auto=format&fit=crop' },
    { city: 'Tokyo', country: 'Japan', visits: 2341, growth: '+18%', flag: '🇯🇵', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=80&auto=format&fit=crop' },
    { city: 'Rome', country: 'Italy', visits: 1923, growth: '+7%', flag: '🇮🇹', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=80&auto=format&fit=crop' },
    { city: 'New York', country: 'USA', visits: 1756, growth: '+4%', flag: '🇺🇸', image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=80&auto=format&fit=crop' },
    { city: 'Bali', country: 'Indonesia', visits: 1489, growth: '+22%', flag: '🇮🇩', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=80&auto=format&fit=crop' },
  ];

  const popularActivities = [
    { name: 'City Walking Tour', category: 'sightseeing', count: 3421, trend: '↑', color: 'text-primary-400' },
    { name: 'Local Food Tour', category: 'food', count: 2876, trend: '↑', color: 'text-amber-400' },
    { name: 'Museum Visit', category: 'culture', count: 2341, trend: '↑', color: 'text-purple-400' },
    { name: 'Hiking & Trekking', category: 'adventure', count: 1987, trend: '↑', color: 'text-green-400' },
    { name: 'Beach Activities', category: 'adventure', count: 1654, trend: '→', color: 'text-cyan-400' },
    { name: 'Shopping Spree', category: 'shopping', count: 1234, trend: '↓', color: 'text-red-400' },
  ];

  const mockUsers = [
    { id: 1, name: 'Vaibhav S.', email: 'vaibhav@example.com', trips: 4, status: 'active', joined: 'May 2024', avatar: 'https://i.pravatar.cc/40?img=1' },
    { id: 2, name: 'Arjun M.', email: 'arjun@example.com', trips: 7, status: 'active', joined: 'Apr 2024', avatar: 'https://i.pravatar.cc/40?img=2' },
    { id: 3, name: 'Sara K.', email: 'sara@example.com', trips: 2, status: 'inactive', joined: 'Mar 2024', avatar: 'https://i.pravatar.cc/40?img=5' },
    { id: 4, name: 'James T.', email: 'james@example.com', trips: 9, status: 'active', joined: 'Feb 2024', avatar: 'https://i.pravatar.cc/40?img=3' },
    { id: 5, name: 'Priya R.', email: 'priya@example.com', trips: 5, status: 'active', joined: 'Jan 2024', avatar: 'https://i.pravatar.cc/40?img=9' },
  ];

  const statsCards = [
    { label: 'Total Users', value: '1,247', icon: Users, color: 'from-primary-600 to-indigo-600', change: '+12%' },
    { label: 'Total Trips', value: trips.length > 0 ? trips.length.toString() : '3,891', icon: Globe, color: 'from-emerald-600 to-teal-600', change: '+8%' },
    { label: 'Popular Cities', value: '284', icon: MapPin, color: 'from-amber-600 to-orange-600', change: '+5%' },
    { label: 'Activities', value: '12,340', icon: Zap, color: 'from-purple-600 to-pink-600', change: '+15%' },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } } };

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24 font-sans">
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="text-2xl font-bold tracking-wider hover:text-primary-400 transition-colors">
              Traveloop
            </Link>
            <span className="flex items-center gap-1 bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold px-2.5 py-1 rounded-full">
              <Shield className="w-3 h-3" /> Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input type="text" placeholder="Search..." value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-gray-900/60 border border-gray-800 text-white rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary-500 transition-colors placeholder-gray-500 w-48" />
            </div>
            <button className="flex items-center gap-2 bg-gray-900/60 border border-gray-800 text-gray-300 hover:text-white hover:border-gray-600 px-3 py-2 rounded-xl text-sm transition-colors">
              <Filter className="w-4 h-4" />
            </button>
            <button onClick={logout} className="text-gray-400 hover:text-red-400 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-primary-500 bg-gray-800 overflow-hidden">
              <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>

        {/* Page Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400 mb-1">
            Admin Panel
          </h1>
          <p className="text-gray-400">Manage users, monitor trends, and oversee platform activity.</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsCards.map(card => (
            <motion.div key={card.label} variants={itemVariants}
              className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-all group">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-400 text-sm mb-1">{card.label}</p>
              <p className="text-white font-black text-2xl">{card.value}</p>
              <p className="text-green-400 text-xs font-medium mt-1">{card.change} this month</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-8">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                activeTab === tab
                  ? 'bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-500/20'
                  : 'bg-gray-900/60 border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white'
              }`}>
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}>

          {/* ─── MANAGE USERS ─── */}
          {activeTab === 'Manage Users' && (
            <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary-400" /> Registered Users
                </h3>
                <span className="text-gray-400 text-sm">{mockUsers.length} total</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800 bg-gray-900/40">
                      {['User', 'Email', 'Trips', 'Status', 'Joined', 'Actions'].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-gray-400 text-sm font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase())).map((u, i) => (
                      <motion.tr key={u.id}
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-gray-800/60 hover:bg-gray-800/30 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full border border-gray-700" />
                            <span className="text-white font-medium text-sm">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-400 text-sm">{u.email}</td>
                        <td className="px-5 py-4 text-white font-semibold text-sm">{u.trips}</td>
                        <td className="px-5 py-4">
                          <span className={`flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-xs font-semibold border ${
                            u.status === 'active'
                              ? 'bg-green-500/10 border-green-500/30 text-green-400'
                              : 'bg-gray-700/40 border-gray-600/30 text-gray-400'
                          }`}>
                            {u.status === 'active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            {u.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-gray-400 text-sm">{u.joined}</td>
                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            <button className="p-1.5 text-gray-400 hover:text-primary-400 hover:bg-gray-800 rounded-lg transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─── POPULAR CITIES ─── */}
          {activeTab === 'Popular Cities' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                {popularCities.map((city, i) => (
                  <motion.div key={city.city}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-all group flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={city.image} alt={city.city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-lg">{city.flag}</span>
                        <h3 className="text-white font-bold text-base">{city.city}</h3>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{city.country}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm font-medium">{city.visits.toLocaleString()} visits</span>
                        <span className="text-green-400 text-xs font-semibold bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">{city.growth}</span>
                      </div>
                    </div>
                    <span className="text-gray-600 font-black text-2xl flex-shrink-0">#{i + 1}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ─── POPULAR ACTIVITIES ─── */}
          {activeTab === 'Popular Activities' && (
            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary-400" /> Top Activities by Users
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {popularActivities.map((act, i) => {
                  const pct = Math.round((act.count / popularActivities[0].count) * 100);
                  return (
                    <motion.div key={act.name}
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-4">
                      <span className="text-gray-600 font-black text-sm w-4 flex-shrink-0">{i + 1}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-semibold text-sm">{act.name}</span>
                            <span className="text-xs bg-gray-800 text-gray-400 border border-gray-700 px-2 py-0.5 rounded-full capitalize">{act.category}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold ${act.color}`}>{act.trend}</span>
                            <span className="text-gray-300 text-sm font-medium">{act.count.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className={`h-full rounded-full bg-gradient-to-r from-primary-600 to-indigo-600`} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── USER TRENDS & ANALYTICS ─── */}
          {activeTab === 'User Trends & Analytics' && (
            <div className="space-y-6">
              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Pie Chart */}
                <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-primary-400" /> Trip Categories
                  </h4>
                  <div className="flex justify-center mb-4">
                    <svg viewBox="0 0 120 120" className="w-36 h-36">
                      {[
                        { pct: 35, color: '#6366f1', offset: 0 },
                        { pct: 25, color: '#10b981', offset: 35 },
                        { pct: 20, color: '#f59e0b', offset: 60 },
                        { pct: 20, color: '#8b5cf6', offset: 80 },
                      ].map((seg, i) => {
                        const r = 45, circ = 2 * Math.PI * r;
                        return (
                          <circle key={i} cx="60" cy="60" r={r}
                            fill="none" stroke={seg.color} strokeWidth="18"
                            strokeDasharray={`${(seg.pct / 100) * circ} ${circ}`}
                            strokeDashoffset={-((seg.offset / 100) * circ)}
                            transform="rotate(-90 60 60)" />
                        );
                      })}
                    </svg>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[['Sightseeing', '#6366f1', '35%'], ['Adventure', '#10b981', '25%'], ['Food', '#f59e0b', '20%'], ['Culture', '#8b5cf6', '20%']].map(([label, color, pct]) => (
                      <div key={label} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                        <span className="text-gray-300">{label}</span>
                        <span className="text-gray-500 ml-auto">{pct}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Line Chart — Monthly Users */}
                <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 lg:col-span-2">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary-400" /> Monthly Active Users
                  </h4>
                  <div className="flex items-end gap-2 h-32 mb-3">
                    {[40, 65, 45, 80, 55, 90, 70, 95, 75, 110, 85, 120].map((v, i) => (
                      <motion.div key={i} className="flex-1 flex flex-col items-center justify-end gap-1"
                        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.5 }} style={{ transformOrigin: 'bottom' }}>
                        <div className="w-full rounded-t-lg bg-gradient-to-t from-primary-700 to-primary-400"
                          style={{ height: `${(v / 120) * 100}%`, minHeight: '4px' }} />
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-between text-gray-500 text-xs">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Analytics Summary */}
              <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-400" /> Platform Summary
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                  {[
                    { title: 'Manage User Section', desc: 'This section is responsible for managing the users and their actions. The admin has access to view all the trips made by the user. Also other functionalities are welcome.' },
                    { title: 'Popular Cities', desc: 'Lists all the popular cities where the users are visiting based on the current user trends.' },
                    { title: 'Popular Activities', desc: 'Lists all the popular activities that the users are doing based on the current user trend data.' },
                    { title: 'User Trends & Analytics', desc: 'This section will major focus on the providing analytic across various points and give useful information to the user.' },
                    { title: 'Avg. Trip Duration', desc: `${trips.length > 0 ? '7.3' : '—'} days average across all active trips on the platform.` },
                    { title: 'Budget Analytics', desc: 'Average budget per trip is ₹42,000 with 68% of users staying within budget.' },
                  ].map(item => (
                    <div key={item.title} className="p-4 bg-gray-800/40 rounded-xl border border-gray-700/50">
                      <h5 className="text-primary-400 font-semibold mb-2">{item.title}</h5>
                      <p className="text-gray-300 leading-relaxed text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;

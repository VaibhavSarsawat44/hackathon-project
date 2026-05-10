import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search, Filter, SortDesc, Grid, Heart, MessageCircle,
  Share2, Bookmark, Plus, X, MapPin, DollarSign,
  TrendingUp, Users, Star, Send, Home
} from 'lucide-react';

const posts = [
  {
    id: 1, user: 'Arjun Mehta', avatar: 'https://i.pravatar.cc/40?img=1',
    time: '2h ago', location: 'Paris, France', tag: 'City Tour',
    title: 'Hidden gems of Montmartre 🎨',
    content: 'Spent 4 days exploring Paris beyond the Eiffel Tower. The Montmartre neighbourhood is absolutely magical at sunrise — very few tourists and the local cafes serve the best croissants.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop',
    likes: 142, comments: 23, budget: '₹45,000', rating: 4.8, saved: false, liked: false,
  },
  {
    id: 2, user: 'Sara Kapoor', avatar: 'https://i.pravatar.cc/40?img=5',
    time: '5h ago', location: 'Bali, Indonesia', tag: 'Budget Tip',
    title: 'Bali under ₹30,000 — full guide! 💸',
    content: 'Yes it\'s possible! Stay in Ubud guesthouses (₹800/night), eat at warungs (₹150/meal), rent a scooter (₹300/day). Skip Kuta, go to Nusa Penida instead.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop',
    likes: 389, comments: 67, budget: '₹28,000', rating: 4.9, saved: false, liked: false,
  },
  {
    id: 3, user: 'James T.', avatar: 'https://i.pravatar.cc/40?img=3',
    time: '1d ago', location: 'Swiss Alps', tag: 'Adventure',
    title: 'Swiss Alps trekking — what nobody tells you',
    content: 'The Jungfrau region took my breath away, literally! Altitude sickness is real at 3,400m. Carry altitude medication, book trains in advance (save 50%), and always check weather.',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&auto=format&fit=crop',
    likes: 215, comments: 41, budget: '₹1,20,000', rating: 4.7, saved: false, liked: false,
  },
  {
    id: 4, user: 'Priya R.', avatar: 'https://i.pravatar.cc/40?img=9',
    time: '2d ago', location: 'Kyoto, Japan', tag: 'Culture',
    title: 'Cherry Blossom season — worth the hype? 🌸',
    content: 'Went during Hanami season and it was surreal. Maruyama Park at night with illuminated sakura trees is a memory for life. Book hotels 6 months ahead — we almost couldn\'t find a room!',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop',
    likes: 502, comments: 88, budget: '₹95,000', rating: 5.0, saved: false, liked: false,
  },
];

const budgetStats = [
  { label: 'Avg. Budget Shared', value: '₹62,000', icon: DollarSign, color: 'text-primary-400', bg: 'bg-primary-500/10 border-primary-500/20' },
  { label: 'Budget Posts', value: '1.2K', icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
  { label: 'Community Members', value: '8.4K', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
  { label: 'Avg. Rating', value: '4.8 ★', icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
];

const FILTERS = ['All', 'Recent', 'Popular', 'Budget Tips', 'Adventures', 'Culture'];

export default function Community() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [postList, setPostList] = useState(posts);
  const [showModal, setShowModal] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  const [commentText, setCommentText] = useState({});
  const [newPost, setNewPost] = useState({ title: '', content: '', location: '', budget: '', tag: 'City Tour' });

  const toggleLike = (id) => {
    setPostList(p => p.map(post =>
      post.id === id ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
    ));
  };

  const toggleSave = (id) => {
    setPostList(p => p.map(post => post.id === id ? { ...post, saved: !post.saved } : post));
  };

  const handleShare = (title) => {
    navigator.clipboard?.writeText(`Check out: ${title} — Traveloop Community`);
  };

  const toggleComments = (id) => setExpandedComments(p => ({ ...p, [id]: !p[id] }));

  const filtered = postList.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || p.tag === activeFilter ||
      (activeFilter === 'Recent' && ['2h ago', '5h ago'].includes(p.time)) ||
      (activeFilter === 'Popular' && p.likes > 200) ||
      (activeFilter === 'Budget Tips' && p.tag === 'Budget Tip') ||
      (activeFilter === 'Adventures' && p.tag === 'Adventure') ||
      (activeFilter === 'Culture' && p.tag === 'Culture');
    return matchSearch && matchFilter;
  });

  const card = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 22 } } };

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24 font-sans">
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
          <Link to="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white bg-gray-900/60 hover:bg-gray-800 border border-gray-800 hover:border-gray-600 px-4 py-2 rounded-xl transition-all group">
            <Home className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium">Home</span>
          </Link>
          <h1 className="text-xl font-bold tracking-wider">Traveloop</h1>
          <div className="w-10 h-10 rounded-full border-2 border-gray-700 overflow-hidden">
            <img src="https://i.pravatar.cc/40?img=11" alt="me" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Search + Controls */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search posts, destinations..."
              className="w-full bg-gray-900/80 border border-gray-700 text-white rounded-2xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary-500 transition-colors placeholder-gray-500 text-sm" />
          </div>
          <div className="flex gap-2">
            {[['Group by', Grid], ['Filter', Filter], ['Sort by', SortDesc]].map(([label, Icon]) => (
              <button key={label} className="flex items-center gap-1.5 bg-gray-900/80 border border-gray-700 hover:border-gray-500 text-gray-300 px-4 py-3 rounded-2xl text-sm transition-all hover:bg-gray-800 whitespace-nowrap">
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Budget Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {budgetStats.map(s => (
            <div key={s.label} className={`flex items-center gap-3 p-4 bg-gray-900/60 border rounded-2xl ${s.bg}`}>
              <s.icon className={`w-5 h-5 flex-shrink-0 ${s.color}`} />
              <div>
                <p className="text-white font-bold text-sm">{s.value}</p>
                <p className="text-gray-500 text-xs">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Title + Share button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">
            Community tab
          </h2>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg transition-all">
            <Plus className="w-4 h-4" /> Share Experience
          </motion.button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border ${
                activeFilter === f
                  ? 'bg-primary-600 border-primary-500 text-white shadow-lg'
                  : 'bg-gray-900/60 border-gray-700 text-gray-300 hover:border-gray-600'
              }`}>
              {f}
            </button>
          ))}
        </div>

        {/* Posts */}
        <motion.div className="space-y-6" initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.09 } } }}>
          <AnimatePresence>
            {filtered.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-20 border border-dashed border-gray-700 rounded-3xl">
                <p className="text-gray-400">No posts found. Try a different search or filter.</p>
              </motion.div>
            ) : filtered.map(post => (
              <motion.div key={post.id} variants={card} layout
                className="flex gap-4 group">
                {/* Avatar */}
                <div className="flex-shrink-0 pt-1">
                  <img src={post.avatar} alt={post.user}
                    className="w-11 h-11 rounded-full border-2 border-gray-700 group-hover:border-primary-500 transition-colors" />
                </div>

                {/* Card */}
                <div className="flex-1 bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all">
                  {/* Card header */}
                  <div className="p-5 pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-white font-semibold text-sm">{post.user}</span>
                        <span className="text-gray-500 text-xs ml-2">{post.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-primary-500/10 text-primary-300 border border-primary-500/20 px-2.5 py-1 rounded-full font-medium">{post.tag}</span>
                        <button onClick={() => toggleSave(post.id)} className="text-gray-500 hover:text-amber-400 transition-colors">
                          <Bookmark className={`w-4 h-4 ${post.saved ? 'fill-amber-400 text-amber-400' : ''}`} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                      <MapPin className="w-3 h-3 text-primary-400" />
                      <span>{post.location}</span>
                      <span className="mx-1">·</span>
                      <DollarSign className="w-3 h-3 text-green-400" />
                      <span className="text-green-400 font-medium">{post.budget}</span>
                      <span className="mx-1">·</span>
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-amber-400">{post.rating}</span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{post.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{post.content}</p>
                  </div>

                  {/* Image */}
                  <div className="px-5 pb-3">
                    <div className="rounded-xl overflow-hidden h-48 border border-gray-800">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-5 pb-4 flex items-center gap-4 border-t border-gray-800 pt-3">
                    <button onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${post.liked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'}`}>
                      <Heart className={`w-4 h-4 ${post.liked ? 'fill-red-400' : ''}`} />
                      {post.likes}
                    </button>
                    <button onClick={() => toggleComments(post.id)}
                      className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-primary-400 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </button>
                    <button onClick={() => handleShare(post.title)}
                      className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-indigo-400 transition-colors">
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                  </div>

                  {/* Inline Comments */}
                  <AnimatePresence>
                    {expandedComments[post.id] && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-800 px-5 pb-4 pt-3">
                        <p className="text-gray-500 text-xs mb-3">Comments ({post.comments})</p>
                        <div className="flex gap-2">
                          <img src="https://i.pravatar.cc/40?img=11" alt="me" className="w-8 h-8 rounded-full flex-shrink-0" />
                          <div className="flex-1 relative">
                            <input value={commentText[post.id] || ''}
                              onChange={e => setCommentText(p => ({ ...p, [post.id]: e.target.value }))}
                              placeholder="Write a comment..."
                              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2 pr-10 text-sm focus:outline-none focus:border-primary-500 placeholder-gray-500" />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-300 transition-colors">
                              <Send className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4"
            onClick={e => e.target === e.currentTarget && setShowModal(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-gray-900 border border-gray-700 rounded-3xl p-8 w-full max-w-lg shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Share Your Experience</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-xl transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {[['Title', 'title', 'e.g. Hidden gems of Paris'], ['Location', 'location', 'e.g. Paris, France'], ['Total Budget', 'budget', 'e.g. ₹45,000']].map(([label, key, ph]) => (
                  <div key={key}>
                    <label className="text-gray-300 text-sm font-medium mb-1.5 block">{label}</label>
                    <input value={newPost[key]} onChange={e => setNewPost(p => ({ ...p, [key]: e.target.value }))}
                      placeholder={ph}
                      className="w-full bg-gray-800/80 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500 placeholder-gray-500" />
                  </div>
                ))}
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-1.5 block">Category</label>
                  <select value={newPost.tag} onChange={e => setNewPost(p => ({ ...p, tag: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500">
                    {['City Tour', 'Budget Tip', 'Adventure', 'Culture', 'Beach', 'Food'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-1.5 block">Your Experience</label>
                  <textarea value={newPost.content} onChange={e => setNewPost(p => ({ ...p, content: e.target.value }))}
                    rows={4} placeholder="Share your travel story, tips, budget breakdown..."
                    className="w-full bg-gray-800/80 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500 placeholder-gray-500 resize-none" />
                </div>
                <div className="flex gap-3 pt-2">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (!newPost.title || !newPost.content) return;
                      setPostList(p => [{
                        id: Date.now(), user: 'You', avatar: 'https://i.pravatar.cc/40?img=11',
                        time: 'Just now', location: newPost.location || 'Unknown', tag: newPost.tag,
                        title: newPost.title, content: newPost.content,
                        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop',
                        likes: 0, comments: 0, budget: newPost.budget || '—', rating: 5.0, saved: false, liked: false,
                      }, ...p]);
                      setNewPost({ title: '', content: '', location: '', budget: '', tag: 'City Tour' });
                      setShowModal(false);
                    }}
                    className="flex-1 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl transition-all">
                    Post Experience
                  </motion.button>
                  <button onClick={() => setShowModal(false)}
                    className="px-6 bg-gray-800 hover:bg-gray-700 text-gray-300 py-3 rounded-xl transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

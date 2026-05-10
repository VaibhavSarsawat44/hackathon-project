import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search, Filter, Plus, Trash2, Edit3, X, Check,
  BookOpen, MapPin, Calendar, ChevronDown, LogOut
} from 'lucide-react';
import { getTrips } from '../services/tripService';
import { getNotes, createNote, updateNote, deleteNote } from '../services/notesService';
import { getUser, logout } from '../services/authService';

const TripNotes = () => {
  const user = getUser();
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [tripDropdown, setTripDropdown] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTrips();
  }, []);

  useEffect(() => {
    if (selectedTrip) fetchNotes();
  }, [selectedTrip]);

  const fetchTrips = async () => {
    try {
      const data = await getTrips();
      const tripList = data.data.trips || [];
      setTrips(tripList);
      if (tripList.length > 0) setSelectedTrip(tripList[0]);
    } catch (e) {}
  };

  const fetchNotes = async () => {
    if (!selectedTrip) return;
    setLoading(true);
    try {
      const data = await getNotes(selectedTrip._id);
      setNotes(data.data.notes || []);
    } catch (e) { setNotes([]); }
    finally { setLoading(false); }
  };

  const handleAddNote = async () => {
    if (!newNote.title || !newNote.content) return;
    setSaving(true);
    try {
      await createNote({ tripId: selectedTrip._id, ...newNote });
      setNewNote({ title: '', content: '' });
      setShowAddModal(false);
      fetchNotes();
    } catch (e) {}
    finally { setSaving(false); }
  };

  const handleUpdateNote = async () => {
    if (!editingNote) return;
    setSaving(true);
    try {
      await updateNote(editingNote._id, { title: editingNote.title, content: editingNote.content });
      setEditingNote(null);
      fetchNotes();
    } catch (e) {}
    finally { setSaving(false); }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter(n => n._id !== id));
    } catch (e) {}
  };

  const filteredNotes = notes.filter(n => {
    const matchSearch = n.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content?.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === 'All') return matchSearch;
    if (filter === 'by Day') return matchSearch && !n.stopId;
    if (filter === 'by Stop') return matchSearch && !!n.stopId;
    return matchSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24 font-sans">
      {/* Background glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <Link to="/dashboard" className="text-2xl font-bold tracking-wider hover:text-primary-400 transition-colors">
            Traveloop
          </Link>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input type="text" placeholder="Search notes..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="bg-gray-900/60 border border-gray-800 text-white rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary-500 transition-colors placeholder-gray-500 w-52"
              />
            </div>
            <span className="text-gray-400 text-sm hidden sm:block">
              Hi, <span className="text-white font-medium">{user?.name || 'Traveler'}</span>
            </span>
            <button onClick={logout} className="text-gray-400 hover:text-red-400 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-gray-700 bg-gray-800 overflow-hidden">
              <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>

        {/* Page Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-primary-400" />
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">
              Trip Notes
            </h1>
          </div>
          <p className="text-gray-400 ml-11">Your personal travel journal</p>
        </motion.div>

        {/* Trip Selector + Add Note */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8">

          {/* Trip Dropdown */}
          <div className="relative">
            <button onClick={() => setTripDropdown(!tripDropdown)}
              className="flex items-center gap-3 bg-gray-900/60 border border-gray-700 text-white rounded-xl px-5 py-3 hover:border-primary-500 transition-colors min-w-[250px]">
              <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0" />
              <span className="font-medium truncate flex-1 text-left">
                {selectedTrip ? selectedTrip.tripName : 'Select a Trip'}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${tripDropdown ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {tripDropdown && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  className="absolute top-full left-0 mt-2 w-full bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                  {trips.length === 0 ? (
                    <p className="text-gray-400 text-sm px-4 py-3">No trips found</p>
                  ) : trips.map(t => (
                    <button key={t._id} onClick={() => { setSelectedTrip(t); setTripDropdown(false); }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-gray-800 ${selectedTrip?._id === t._id ? 'text-primary-400 bg-gray-800/50' : 'text-white'}`}>
                      {t.tripName}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Add Note Button */}
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddModal(true)} disabled={!selectedTrip}
            className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 disabled:opacity-40 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg">
            <Plus className="w-5 h-5" /> Add Note
          </motion.button>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="flex gap-3 mb-8">
          {['All', 'by Day', 'by Stop'].map(tab => (
            <button key={tab} onClick={() => setFilter(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                filter === tab
                  ? 'bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-500/20'
                  : 'bg-gray-900/60 border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white'
              }`}>
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Notes Grid */}
        {!selectedTrip ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20 border border-dashed border-gray-700 rounded-3xl">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Select a trip to view notes</p>
          </motion.div>
        ) : loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredNotes.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20 border border-dashed border-gray-700 rounded-3xl">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-300 text-lg font-medium mb-2">No notes yet</p>
            <p className="text-gray-500 mb-6">Start journaling your adventure!</p>
            <button onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl transition-colors font-medium">
              <Plus className="w-4 h-4" /> Write first note
            </button>
          </motion.div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredNotes.map(note => (
                <motion.div key={note._id} variants={itemVariants} layout
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all group relative overflow-hidden">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />

                  {editingNote?._id === note._id ? (
                    /* Edit Mode */
                    <div className="space-y-3 relative z-10">
                      <input value={editingNote.title}
                        onChange={e => setEditingNote({ ...editingNote, title: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-600 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary-500"
                        placeholder="Note title" />
                      <textarea value={editingNote.content}
                        onChange={e => setEditingNote({ ...editingNote, content: e.target.value })}
                        rows={4}
                        className="w-full bg-gray-800 border border-gray-600 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary-500 resize-none"
                        placeholder="Note content..." />
                      <div className="flex gap-2">
                        <button onClick={handleUpdateNote} disabled={saving}
                          className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white py-2 rounded-xl text-sm font-medium transition-colors">
                          <Check className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}
                        </button>
                        <button onClick={() => setEditingNote(null)}
                          className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded-xl text-sm font-medium transition-colors">
                          <X className="w-4 h-4" /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* View Mode */
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-white font-bold text-lg leading-snug flex-1 pr-2">{note.title}</h3>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          <button onClick={() => setEditingNote(note)}
                            className="p-1.5 text-gray-400 hover:text-primary-400 hover:bg-gray-800 rounded-lg transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteNote(note._id)}
                            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">{note.content}</p>
                      <div className="flex items-center gap-3 pt-3 border-t border-gray-800">
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(note.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        {note.stopId && (
                          <span className="flex items-center gap-1 text-primary-400 text-xs bg-primary-500/10 border border-primary-500/20 px-2 py-0.5 rounded-full">
                            <MapPin className="w-3 h-3" /> Stop Note
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Add Note Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4"
            onClick={e => e.target === e.currentTarget && setShowAddModal(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-gray-900 border border-gray-700 rounded-3xl p-8 w-full max-w-lg shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Plus className="w-6 h-6 text-primary-400" /> New Note
                </h2>
                <button onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-xl transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">Note Title</label>
                  <input value={newNote.title}
                    onChange={e => setNewNote({ ...newNote, title: e.target.value })}
                    className="w-full bg-gray-800/80 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors placeholder-gray-500"
                    placeholder="e.g. Hotel check-in details — Rome stop" />
                </div>
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">Content</label>
                  <textarea value={newNote.content}
                    onChange={e => setNewNote({ ...newNote, content: e.target.value })}
                    rows={5} placeholder="Write your travel notes here..."
                    className="w-full bg-gray-800/80 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors placeholder-gray-500 resize-none" />
                </div>
                <div className="flex gap-3 pt-2">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={handleAddNote} disabled={saving || !newNote.title || !newNote.content}
                    className="flex-1 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 disabled:opacity-40 text-white font-bold py-3 rounded-xl transition-all">
                    {saving ? 'Saving...' : '+ Add Note'}
                  </motion.button>
                  <button onClick={() => setShowAddModal(false)}
                    className="px-6 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 rounded-xl transition-colors">
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
};

export default TripNotes;

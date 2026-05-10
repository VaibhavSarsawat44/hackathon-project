import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiList, FiShare2, FiRefreshCcw, FiPlus, FiCheck, FiChevronDown } from 'react-icons/fi';
import { ClipboardList } from 'lucide-react';

const initialItems = [
  { id: 1, category: 'Documents', name: 'Passport', isPacked: true },
  { id: 2, category: 'Documents', name: 'Flight Tickets (printed)', isPacked: true },
  { id: 3, category: 'Documents', name: 'Travel insurance', isPacked: true },
  { id: 4, category: 'Documents', name: 'Hotel booking confirmation', isPacked: false },
  
  { id: 5, category: 'Clothing', name: 'Casual Shirts', isPacked: true },
  { id: 6, category: 'Clothing', name: 'Trousers / jeans', isPacked: false },
  { id: 7, category: 'Clothing', name: 'Comfortable walking shoes', isPacked: false },
  { id: 8, category: 'Clothing', name: 'Light jacket / windbreaker', isPacked: false },

  { id: 9, category: 'Electronics', name: 'Phone charger', isPacked: true },
  { id: 10, category: 'Electronics', name: 'Universal power adapter', isPacked: false },
  { id: 11, category: 'Electronics', name: 'Earphones / headphones', isPacked: false },
];

const PackingChecklist = () => {
  const [items, setItems] = useState(initialItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrip, setSelectedTrip] = useState('Paris & Rome Adventure');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Documents');

  // Derived state
  const filteredItems = useMemo(() => {
    return items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [items, searchQuery]);

  const packedCount = items.filter(i => i.isPacked).length;
  const totalCount = items.length;
  const progressPercentage = totalCount === 0 ? 0 : Math.round((packedCount / totalCount) * 100);

  // Group by category
  const groupedItems = useMemo(() => {
    return filteredItems.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [filteredItems]);

  const toggleItem = (id) => {
    setItems(items.map(i => i.id === id ? { ...i, isPacked: !i.isPacked } : i));
  };

  const resetAll = () => {
    if(window.confirm("Are you sure you want to uncheck all items?")) {
      setItems(items.map(i => ({ ...i, isPacked: false })));
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newItem = {
      id: Date.now(),
      category: newItemCategory,
      name: newItemName.trim(),
      isPacked: false,
    };
    setItems([...items, newItem]);
    setNewItemName('');
    setShowAddModal(false);
  };

  const shareChecklist = () => {
    alert("Checklist link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-primary-500/30 pb-20 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 text-primary-400 font-medium mb-2">
              <ClipboardList className="w-4 h-4" />
              <span>Preparation</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Packing <span className="text-gray-500 font-light">Checklist</span>
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <button 
              onClick={shareChecklist}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 rounded-xl transition-all text-sm font-bold shadow-lg shadow-primary-900/20"
            >
              <FiShare2 className="w-4 h-4" /> Share
            </button>
          </motion.div>
        </div>

        {/* Controls Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-4 rounded-2xl flex flex-col lg:flex-row items-center gap-4 mb-10 shadow-2xl"
        >
          <div className="relative w-full lg:w-96 group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search items..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-12 pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-gray-200"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto ml-auto">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl hover:border-gray-700 transition-all text-sm text-gray-300">
              <FiList className="w-4 h-4 text-gray-400" /> Group by
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl hover:border-gray-700 transition-all text-sm text-gray-300">
              <FiFilter className="w-4 h-4 text-gray-400" /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl hover:border-gray-700 transition-all text-sm text-gray-300">
              Sort by <FiChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </motion.div>

        {/* Trip Selection & Progress */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-6 rounded-[2rem] shadow-2xl mb-10"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative inline-block w-full sm:w-auto">
              <select 
                value={selectedTrip}
                onChange={(e) => setSelectedTrip(e.target.value)}
                className="appearance-none w-full sm:w-auto bg-gray-950 border border-gray-700 text-white py-2.5 pl-4 pr-10 rounded-xl font-medium focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 cursor-pointer"
              >
                <option value="Paris & Rome Adventure">Trip: Paris & Rome Adventure</option>
                <option value="Bali Getaway">Trip: Bali Getaway</option>
                <option value="Tokyo Explorer">Trip: Tokyo Explorer</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
            
            <div className="text-sm font-medium text-gray-400">
              Progress: <span className="text-primary-400 font-bold text-lg">{packedCount}/{totalCount}</span> items packed
            </div>
          </div>

          <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary-500 to-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </motion.div>

        {/* Checklist Categories */}
        <div className="space-y-6">
          <AnimatePresence>
            {Object.entries(groupedItems).map(([category, catItems]) => {
              const catPackedCount = catItems.filter(i => i.isPacked).length;
              const catTotalCount = catItems.length;
              
              return (
                <motion.div 
                  key={category} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-900/40 border border-gray-800 rounded-2xl overflow-hidden"
                >
                  <div className="flex items-center justify-between px-6 py-4 bg-gray-900/80 border-b border-gray-800">
                    <h2 className="text-lg font-bold text-white">{category}</h2>
                    <span className="text-xs font-bold text-gray-400 bg-gray-950 px-3 py-1 rounded-full border border-gray-800 shadow-inner">
                      {catPackedCount}/{catTotalCount}
                    </span>
                  </div>
                  <div className="divide-y divide-gray-800/50">
                    {catItems.map((item) => (
                      <label 
                        key={item.id} 
                        className="flex items-center gap-4 px-6 py-4 hover:bg-gray-800/50 cursor-pointer transition-colors group"
                      >
                        <div className={`relative flex items-center justify-center w-6 h-6 rounded-md border transition-all duration-200 ${item.isPacked ? 'bg-primary-500 border-primary-500' : 'border-gray-600 group-hover:border-primary-400 bg-gray-950'}`}>
                          <input 
                            type="checkbox" 
                            className="opacity-0 absolute inset-0 cursor-pointer"
                            checked={item.isPacked}
                            onChange={() => toggleItem(item.id)}
                          />
                          {item.isPacked && <FiCheck className="text-white text-sm" />}
                        </div>
                        <span className={`text-base font-medium transition-colors duration-200 ${item.isPacked ? 'text-gray-600 line-through' : 'text-gray-200'}`}>
                          {item.name}
                        </span>
                      </label>
                    ))}
                    {catItems.length === 0 && (
                      <div className="px-6 py-4 text-gray-500 text-sm italic">No items found matching your search.</div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-8">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex-1 min-w-[200px] flex items-center justify-center gap-2 py-4 px-6 bg-transparent border-2 border-dashed border-gray-700 rounded-xl text-gray-400 font-bold hover:border-primary-500 hover:text-primary-400 hover:bg-primary-500/5 transition-all"
          >
            <FiPlus className="w-5 h-5" /> Add new item
          </button>
          <button 
            onClick={resetAll}
            className="flex items-center justify-center gap-2 py-4 px-6 bg-gray-900 border border-gray-800 rounded-xl text-gray-400 font-bold hover:bg-gray-800 hover:text-white transition-all shadow-lg"
          >
            <FiRefreshCcw /> Reset all
          </button>
        </div>

      </div>

      {/* Add Item Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative z-10"
            >
              <div className="px-6 py-5 border-b border-gray-800 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Add New Item</h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-white transition-colors p-1 bg-gray-800 rounded-full">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <form onSubmit={handleAddItem} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Item Name</label>
                  <input 
                    type="text" 
                    autoFocus
                    required
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 text-white rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder-gray-600"
                    placeholder="e.g. Sunglasses"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                  <select 
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 text-white rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                  >
                    {Array.from(new Set(items.map(i => i.category))).concat(['Other']).filter((v, i, a) => a.indexOf(v) === i).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="pt-4 flex gap-3 justify-end">
                  <button 
                    type="button" 
                    onClick={() => setShowAddModal(false)}
                    className="px-5 py-2.5 text-sm font-bold text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2.5 text-sm font-bold text-white bg-primary-600 hover:bg-primary-500 rounded-xl transition-colors shadow-lg shadow-primary-900/20"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default PackingChecklist;
